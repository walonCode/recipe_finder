import Voting from "@/core/models/voting.model";
import { apiResponse } from "@/core/helpers/apiResponse";
import connectDB from "@/core/configs/connectDB";
import { errorHandler } from "@/core/helpers/errorHandler";
import User from "@/core/models/user.model";
import Food from "@/core/models/food.model";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function DELETE(req:NextRequest, {params}:{params:Promise<{votingId:string}>}){
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
        const votingId = (await params).votingId

        //checking if the user has the voting id
        const checking = user.votes.map((vote:string) => vote === votingId)
        if(!checking){
            return errorHandler(400, "user if not allowed to delete this voting","not authorized")
        }

        const voting = await Voting.findByIdAndDelete({_id:votingId})
        if(!voting){
            return errorHandler(400, "voting not found","invalid voting Id")
        }

        //deleting voting from the user and food documents
        await user.updateOne({$pull: {votes:votingId}})
        await Food.updateOne({$pull: {votes:votingId}})

        //sending response
        return apiResponse("voting deleted", 200, null)

    }catch(error){
        return errorHandler(500, "server error", error)
    }
}