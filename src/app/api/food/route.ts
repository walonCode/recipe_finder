import Food from "@/core/models/food.model";
import { apiResponse } from "@/core/helpers/apiResponse";
import { errorHandler } from "@/core/helpers/errorHandler";
import connectDB from "@/core/configs/connectDB";
import { NextRequest } from "next/server";
import { createFoodSchema } from "@/core/validators/food.validator";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import User from "@/core/models/user.model";
import { supabase } from "@/core/configs/supabase";


export async function POST(req:NextRequest){
    try{
        //database connection
        await connectDB()

        //geting the username from the cookie
        const token = (await cookies()).get("accessToken")?.value  as string
        if(!token){
            return errorHandler(401, "unauthorized", "no token found")
        }

        const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id:string, username:string}

        //getting data from the request
        const formData = await req.formData()
        const name = formData.get("name") as string
        const origin = formData.get("origin") as string
        const ingredients = formData.get("ingredients") as string
        const image = formData.get("image") as File
        
        //validating the data
        const reqBody = {
            name,
            origin,
            ingredient:JSON.parse(ingredients)
        }
        const result = createFoodSchema.safeParse(reqBody)
        if(!result.success){
            return errorHandler(400, "invalid form fields", result.error.message[0])
        }

        if(!image){
            return errorHandler(400, "please provide an image", "image not found")
        }

        //geting the user
        const user = await User.findOne({_id:decodedUser.id})
        if(!user){
            return errorHandler(400, "no user found", "invalid user")
        }

        //checking if the food already exist
        const food = await Food.findOne({name})
        if(food){
            return errorHandler(400, "food already exist","food is in the database")
        }

        //getting the file buffer and make the image name
        const fileName = `${name}`
        const buffer = await image.arrayBuffer()
        const imageBytes = Buffer.from(buffer)
        const maxSize = 5 * 1024 * 1024

        if(image.size > maxSize){
            return errorHandler(400, "image size greater than 5mb", "image to large")
        }

        const { error } = await supabase.storage.from("food").upload(
            fileName, imageBytes, {
                cacheControl:'3600',
                upsert: false,
                contentType: image.type
            }
        )

        if(error){
            return errorHandler(500, "server error", error)
        }

        const { data:urlData } = supabase.storage.from('food').getPublicUrl(name, {
            transform: {
                width:500,
                height:500,
                quality:50
            }
        })

        const imageUrl = urlData.publicUrl

        //creating food in the databse
        const newFood = new Food({
            name,
            origin,
            ingredient:JSON.parse(ingredients),
            userId:decodedUser.id,
            username:decodedUser.username,
            image:imageUrl
        })

        await newFood.save()

        user.food.push(newFood._id as string)
        await user.save()

        return apiResponse("food created", 201, newFood)

    }catch(error){
        return errorHandler(500, 'server error', error)
    }
}