import User from "../models/user.model";
import  jwt  from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { errorHandler } from "../helpers/errorHandler";
import { apiResponse } from "../helpers/apiResponse";
import { asyncHandler } from "../helpers/asyncHandler";
import { loginUserSchema, registeUserSchema } from "../validators/user.validator";
import {Request, Response} from 'express'


export const login = asyncHandler(async (req:Request, res:Response) => {
    const result  = loginUserSchema.safeParse(req.body)
    if (!result.success) {
        return errorHandler(res, 400, "Bad request", result.error)
    }

    const { username, password } = result.data

    const user = await User.findOne({ username })
    if (!user) {
        return errorHandler(res, 404, "User not found", null)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return errorHandler(res, 401, "Unauthorized", null)
    }
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1d' })

    const userResponse = user.toObject() as Record<string, any>
    delete userResponse.password
    return apiResponse(res, 200, "Login successful", { userResponse, accessToken })
})                                                        

export const register = asyncHandler(async (req, res) => {
    const result = registeUserSchema.safeParse(req.body)
    if (!result.success) {
        return errorHandler(res, 400, "Bad request", result.error)
    }    

    const { fullname, username, password, email } = result.data 

    const existingUser = await User.findOne({ username })    
    if (existingUser) {
        return errorHandler(res, 409, "User already exists", null)
    }               

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ fullname, username, password: hashedPassword, email })
    const savedUser = await newUser.save()

    const accessToken = jwt.sign({ id: savedUser._id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1d' })               

    const userResponse = savedUser.toObject() as Record<string, any>            
    delete userResponse.password
    return apiResponse(res, 201, "User registered successfully", { userResponse, accessToken })    
})