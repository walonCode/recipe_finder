import Rating from "@/core/models/rating.model";
import { apiResponse } from "@/core/helpers/apiResponse";
import { errorHandler } from "@/core/helpers/errorHandler";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import User from "@/core/models/user.model";
import Food from "@/core/models/food.model";
import { NextRequest } from "next/server";
import connectDB from "@/core/configs/connectDB";
import { createRatingSchema } from "@/core/validators/rating.validator";

export async function POST(req:NextRequest, {params}:{params:Promise<{foodId:string}>}){
    try{
        //database connection
        await connectDB()

        //checking if there is a cookie
        const token = (await cookies()).get("accessToken")?.value  as string
        if(!token){
            return errorHandler(401, "unauthorized", "no token found")
        }
        
        const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id:string, username:string}

        const user = await User.findOne({_id:decodedUser.id})
        if(!user){
            return errorHandler(400, "no user found", "no user")
        }

        //getting the params
        const foodId = (await params).foodId

        //getting the food
        const food = await Food.findOne({_id:foodId})
        if(!food){
            return errorHandler(400, "food not found", "no food")
        }

        //geting the data from the request
        const reqBody = await req.json()
        
        //validating the data
        const result = createRatingSchema.safeParse(reqBody)
        if(!result.success){
            return errorHandler(400, "invalid rating", "wrong rating")
        }

        const {rating} = result.data

        //creating new rating
        const newRating = new Rating({
            foodId,
            userId:decodedUser.id,
            username:decodedUser.username,
            rating,
        })

        await newRating.save()

        user.ratings.push(newRating._id as string)
        await user.save()

        food.ratings.push(newRating._id as string)
        await food.save()
        
        return apiResponse("ratings created", 201, newRating)
    }catch(error){
        return errorHandler(500, "server error", error)
    }
}