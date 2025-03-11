import { apiResponse } from "../helpers/apiResponse";
import { errorHandler } from "../helpers/errorHandler";
import { asyncHandler } from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Request, Response } from "express";
import User from "../models/user.model";
import Food from "../models/food.model";
import Voting from "../models/voting.model";
import { createVoteSchema } from "../validators/vote.validator";

export const createVoting = asyncHandler(async (req:AuthRequest, res:Response) => {
    const result = createVoteSchema.safeParse(req.body)
    if (!result.success) {
        return errorHandler(res, 400, "Bad request", result.error)
    }
    const { foodId, voteType } = result.data
    const food = await Food.findOne({ _id:foodId })    
    if (!food) {
        return errorHandler(res, 404, "Food not found", null)
    }
    const userId = req.user?.id        
    const user = await User.findOne({ _id:userId })    
    if (!user) {
        return errorHandler(res, 404, "User not found", null)
    }
    const voting = await Voting.findOne({ foodId, userId })
    if(voting) {
        return errorHandler(res, 409, "You have already voted for this food", null)
    }
    const newVoting = new Voting({ foodId, voteType, userId, username:user.username })
    const savedVoting = await newVoting.save()

    user.votes.push(savedVoting._id as string)
    await user.save() 

    food.votes.push(savedVoting._id as string)
    await food.save()
    return apiResponse(res, 200, "Voting created successfully", savedVoting)
})

export const deleteVoting = asyncHandler(async (req:AuthRequest, res:Response) => {
    const { id } = req.params
    const userId = req.user?.id
    const voting = await Voting.findByIdAndDelete(id)
    if (!voting) {
        return errorHandler(res, 404, "Voting not found", null)
    }
    await User.findByIdAndUpdate({ _id: userId }, {$pull: { votes: voting?._id }})
    await Food.findByIdAndUpdate({ _id:voting?.foodId }, {$pull: { votes: voting?._id }})
    return apiResponse(res, 200, "Voting deleted successfully", id)
})

export const getAllUserVoting = asyncHandler(async(req:AuthRequest,res) => {
    const userId = req.user?.id
    const userVoting = await Voting.find({ userId })
    if (userVoting.length === 0) {
        return apiResponse(res, 200, "No voting for this user", null)
    }
    return apiResponse(res, 200, "Voting fetched successfully", userVoting)
})

export const getAllFoodVoting = asyncHandler(async(req,res) => {
    const { foodId } = req.params
    const foodVoting = await Voting.find({ foodId })
    if (foodVoting.length === 0) {
        return apiResponse(res, 200, "No voting for this food", null)
    }
    return apiResponse(res, 200, "Voting fetched successfully", foodVoting)
})