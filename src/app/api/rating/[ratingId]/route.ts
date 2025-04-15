import Rating from "@/core/models/rating.model";
import { apiResponse } from "@/core/helpers/apiResponse";
import connectDB from "@/core/configs/connectDB";
import { errorHandler } from "@/core/helpers/errorHandler";
import User from "@/core/models/user.model";
import Food from "@/core/models/food.model";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function DELETE(req:NextRequest, {params}:{params:Promise<{ratingId:string}>}){
    try{
        //connecting to database
        await connectDB()

        //geting the username from the cookie
        const token = (await cookies()).get("accessToken")?.value  as string
        if(!token){
            return errorHandler(401, "unauthorized", "no token found")
        }

        const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id:string, username:string}

        //getting the user
        const user = await User.findOne({_id:decodedUser.id})
        if(!user){
            return errorHandler(400, "user not found", "null user")
        }

        //getting the params
        const ratingId = (await params).ratingId

        //checking if the user has the rating id
        const checking = user.ratings.map((rating) => rating === ratingId)
        if(!checking){
            return errorHandler(400, "user if not allowed to delete this rating","not authorized")
        }

        const rating = await Rating.findByIdAndDelete({_id:ratingId})
        if(!rating){
            return errorHandler(400, "rating not found","invalid rating Id")
        }

        //deleting rating from the user and food documents
        await user.updateOne({$pull: {ratings:ratingId}})
        await Food.updateOne({$pull: {ratings:ratingId}})

        //sending response
        return apiResponse("rating deleted", 200, null)

    }catch(error){
        return errorHandler(500, "server error", error)
    }
}