import Step from "@/core/models/step.model";
import { apiResponse } from "@/core/helpers/apiResponse";
import connectDB from "@/core/configs/connectDB";
import { errorHandler } from "@/core/helpers/errorHandler";
import User from "@/core/models/user.model";
import Food from "@/core/models/food.model";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function DELETE(req:NextRequest, {params}:{params:Promise<{stepId:string}>}){
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
        const stepId = (await params).stepId

        //checking if the user has the rating id
        const checking = user.steps.map((step:string) => step === stepId)
        if(!checking){
            return errorHandler(400, "user if not allowed to delete this rating","not authorized")
        }

        const rating = await Step.findByIdAndDelete({_id:stepId})
        if(!rating){
            return errorHandler(400, "rating not found","invalid rating Id")
        }

        //deleting rating from the user and food documents
        await user.updateOne({$pull: {steps:stepId}})
        await Food.updateOne({$pull: {steps:stepId}})

        //sending response
        return apiResponse("rating deleted", 200, null)

    }catch(error){
        return errorHandler(500, "server error", error)
    }
}