import { apiResponse } from "../helpers/apiResponse";
import { errorHandler } from "../helpers/errorHandler";
import { asyncHandler } from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Request, Response } from "express";
import Step from "../models/step.model";
import User from "../models/user.model";
import Food from "../models/food.model";
import { createStepSchema } from "../validators/step.validator";   


export const createStep = asyncHandler(async (req:AuthRequest, res:Response) => {
    const result = createStepSchema.safeParse(req.body)
    if (!result.success) {
        return errorHandler(res, 400, "Bad request", result.error)
    }
    const { foodId, step } = result.data
    const user = await User.findOne({ _id:req.user?.id })
    if (!user) {
        return errorHandler(res, 404, "User not found", null)
    }
    const food = await Food.findOne({ _id:foodId })    
    if (!food) {
        return errorHandler(res, 404, "Food not found", null)
    }
    const newStep = new Step({ foodId, step, userId:user._id, username:user.username })
    const savedStep = await newStep.save()           
    food.steps.push(savedStep._id as string)
    await food.save()    
    return apiResponse(res, 200, "Step created successfully", savedStep)    
})

export const deleteStep = asyncHandler(async (req:Request, res:Response) => {
    const { id } = req.params
    const step = await Step.findByIdAndDelete(id)        
    if (!step) {
        return errorHandler(res, 404, "Step not found", null)
    }
    await Food.findByIdAndUpdate({ _id:step?.foodId }, {$pull: { steps: step?._id }})
    return apiResponse(res, 200, "Step deleted successfully", id)
})

export const getAllFoodSteps = asyncHandler(async(req:Request,res:Response) => {
    const { foodId } = req.params
    const foodSteps = await Step.find({ foodId })
    if (foodSteps.length === 0) {
        return apiResponse(res, 200, "No steps for this food", null)
    }
    return apiResponse(res, 200, "Steps fetched successfully", foodSteps)
})
