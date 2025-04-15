import Food from "@/core/models/food.model";
import User from "@/core/models/user.model";
import jwt from "jsonwebtoken"
import { apiResponse } from "@/core/helpers/apiResponse";
import { errorHandler } from "@/core/helpers/errorHandler";
import Rating from "@/core/models/rating.model";
import Voting from "@/core/models/voting.model";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import Step from "@/core/models/step.model";
import connectDB from "@/core/configs/connectDB";

export async function DELETE(req:NextRequest, {params}:{params:Promise<{foodId:string}>}){
    try{
        //database connection
        await connectDB()

        //geting the token from the request
        const token = (await cookies()).get("accessToken")?.value  as string
        if(!token){
            return errorHandler(401, "unauthorized", "no token found")
        }

        const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id:string, username:string}

        //geting the user 
        const user = await User.findOne({_id:decodedUser.id})
        if(!user){
            return errorHandler(400, "user not found", "no user")
        }

        //getting the param
        const foodId = (await params).foodId

        if(user.food.map((food:string) => food !== foodId )){
            return errorHandler(401, "not authorized to delete","not the creator of the food")
        }

        
        const food = await Food.findByIdAndDelete({_id:foodId})
        if(!food){
            return errorHandler(400, "food not  found", "invalid food")
        }
        
        //removing the food for the user document
        await user.updateOne({$pull: {food:foodId}})

        //deleting the vote,rating,and steps
        await Step.deleteMany({foodId:foodId})
        await Voting.deleteMany({foodId:foodId})
        await Rating.deleteMany({foodId:foodId})

        //sending the response
        return apiResponse("food deleted", 200, null)

    }catch(error){
        return errorHandler(500, "server error", error)
    }
}