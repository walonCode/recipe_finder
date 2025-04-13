import { NextRequest } from "next/server";
import User from "@/core/models/user.model";
import connectDB from "@/core/configs/connectDB";
import { apiResponse } from "@/core/helpers/apiResponse";
import { errorHandler } from "@/core/helpers/errorHandler";
import bcrypt from "bcryptjs"
import { registeUserSchema } from "@/core/validators/user.validator";

export async function POST(req: NextRequest) {
    try{
        //connection to database
        await connectDB()

        //get data from the request
        const reqBody = await req.json();

        //validating the data
        const result = registeUserSchema.safeParse(reqBody)
        if(!result.success){
            return errorHandler(400, "all fields are required", result.error)   
        }

        //getting the field from the result
        const { fullname, username, password, email, bio, address} = result.data

        //checking if user exist
        const user = await User.findOne({username})
        if(user){
            return errorHandler(400, "user already exist", null)
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating the user
        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            email,
            bio,
            address
        })

        //saving the user
        await newUser.save()

        return apiResponse("user created successfully", 201, null)

    }catch(error){
        return errorHandler(500, "server error", error)
    }
}