import Step from "@/core/models/step.model";
import { apiResponse } from "@/core/helpers/apiResponse";
import { errorHandler } from "@/core/helpers/errorHandler";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import User from "@/core/models/user.model";
import Food from "@/core/models/food.model";
import { NextRequest } from "next/server";
import connectDB from "@/core/configs/connectDB";
import { createStepSchema } from "@/core/validators/step.validator";

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
        const result = createStepSchema.safeParse(reqBody)
        if(!result.success){
            return errorHandler(400, "invalid step", "wrong step")
        }

        const {step} = result.data

        //creating new rating
        const newStep = new Step({
            foodId,
            userId:decodedUser.id,
            username:decodedUser.username,
            step
        })

        await newStep.save()

        user.steps.push(newStep._id as string)
        await user.save()

        food.steps.push(newStep._id as string)
        await food.save()
        
        return apiResponse("step created", 201, newStep)
    }catch(error){
        return errorHandler(500, "server error", error)
    }
}