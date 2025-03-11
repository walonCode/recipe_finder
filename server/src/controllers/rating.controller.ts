import { apiResponse } from "../helpers/apiResponse";
import { errorHandler } from "../helpers/errorHandler";
import { asyncHandler } from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Response } from "express";
import Rating from "../models/rating.model";
import User from "../models/user.model";
import Food from "../models/food.model";
import { createRatingSchema } from "../validators/rating.validator";

export const createRating = asyncHandler(async (req:AuthRequest, res:Response) => {
    const result = createRatingSchema.safeParse(req.body)
    const userId = req.user?.id
    if (!result.success) {
        return errorHandler(res, 400, "Bad request", result.error)
    }
    const { foodId, rating, username } = result.data
    const user = await User.findOne({ _id:userId })
    if (!user) {
        return errorHandler(res, 404, "User not found", null)
    }
    const food = await Food.findOne({ _id:foodId })
    if (!food) {
        return errorHandler(res, 404, "Food not found", null)
    }
    const newRating = new Rating({ foodId, rating, userId, username })
    const savedRating = await newRating.save()

    user.ratings.push(savedRating._id as string)
    await user.save()

    food.ratings.push(savedRating._id as string)
    await food.save()    

    return apiResponse(res, 200, "Rating created successfully", savedRating)
})

export const deleteRating = asyncHandler(async (req:AuthRequest, res:Response) => {
    const { id } = req.params
    const userId = req.user?.id
    const rating = await Rating.findByIdAndDelete(id)
    if (!rating) {
        return errorHandler(res, 404, "Rating not found", null)
    }
    await User.findByIdAndUpdate({ _id:userId }, {$pull: { ratings: rating?._id }})
    await Food.findByIdAndUpdate({ _id:rating?.foodId }, {$pull: { ratings: rating?._id }})
    return apiResponse(res, 200, "Rating deleted successfully", id)
})

export const getAllFoodRating = asyncHandler(async(req,res) => {
    const { foodId } = req.params
    const foodRating = await Rating.find({ foodId })
    if (foodRating.length === 0) {
        return apiResponse(res, 200, "No ratings for this food", null)
    }
    return apiResponse(res, 200, "Ratings fetched successfully", foodRating)
})

export const getAllUserRating = asyncHandler(async(req:AuthRequest,res) => {
    const userId = req.user?.id
    const userRatings = await Rating.find({ userId })
    if (userRatings.length === 0) {
        return apiResponse(res, 200, "No ratings for this user", null)
    }
    return apiResponse(res, 200, "Ratings fetched successfully", userRatings)
})