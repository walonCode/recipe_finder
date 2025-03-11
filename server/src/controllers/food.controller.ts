import { createFoodSchema, updateFoodSchema } from "../validators/food.validator";
import { apiResponse } from "../helpers/apiResponse";
import { errorHandler } from "../helpers/errorHandler";
import { asyncHandler } from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Request, Response } from "express";
import Food  from "../models/food.model";
import User from "../models/user.model";


export const createFood = asyncHandler(async (req:AuthRequest, res:Response) => {
    const result = createFoodSchema.safeParse(req.body)
    if (!result.success) {
        return errorHandler(res, 400, "Bad request", result.error)
    }

    //get userId from the request header
    const userId = req.user?.id

    const { name, origin, ingredient, } = result.data
    const user = await User.findOne({ _id:userId })
    if (!user) {
        return errorHandler(res, 404, "User not found", null)
    }

    const food = await Food.findOne({ name })
    if (food) {
        return errorHandler(res, 409, "Food already exists", null)
    }
    const newFood = new Food({ 
        name, 
        origin, 
        ingredient, 
        userId, 
        username: user.username 
    })
    const savedFood = await newFood.save()

    user.food.push((savedFood._id) as string)
    await user.save()

    return apiResponse(res, 201, "Food created successfully", savedFood)
})

export const deleteFood = asyncHandler(async (req:AuthRequest, res:Response) => {
    const { id } = req.params   
    const userId = req.user?.id

    const food = await Food.findByIdAndDelete(id)

    await User.findByIdAndUpdate({userId}, {$pull: {food: food?._id}})
    if (!food) {
        return errorHandler(res, 404, "Food not found", null)
    }
    return apiResponse(res, 200, "Food deleted successfully", id)
})

export const getAllFoods = asyncHandler(async (req:Request, res:Response) => {
    const foods = await Food.find({})
    if(foods.length === 0) {
        return apiResponse(res, 200, "No food added to the database", null)
    }
    return apiResponse(res, 200, "Foods fetched successfully", foods)
})

export const getAllUserFoods = asyncHandler(async (req:AuthRequest, res:Response) => {
    const userId = req.user?.id
    const userFoods = await Food.find({ userId })
    if(userFoods.length === 0) {
        return apiResponse(res, 200, "No food added to the database", null)
    }
    return apiResponse(res, 200, "Foods fetched successfully", userFoods)
})

export const updateFood = asyncHandler(async (req:AuthRequest, res:Response) => {
    const { id } = req.params
    const result = updateFoodSchema.safeParse(req.body)
    if (!result.success) {
        return errorHandler(res, 400, "Bad request", result.error)    
    }

    const { name, origin, ingredient } = result.data
    const food = await Food.findById(id)
    if (!food) {    
        return errorHandler(res, 404, "Food not found", null)
    }

    food.name = name as string    
    food.origin = origin as string
    food.ingredient = ingredient as []  
    const updatedFood = await food.save()

    return apiResponse(res, 200, "Food updated successfully", updatedFood)
})