import { NextRequest } from "next/server";
import User from "@/core/models/user.model";
import connectDB from "@/core/configs/connectDB";
import { apiResponse } from "@/core/helpers/apiResponse";
import { errorHandler } from "@/core/helpers/errorHandler";
import bcrypt from "bcryptjs";
import { loginUserSchema } from "@/core/validators/user.validator";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    //connection to database
    await connectDB();

    //get data from the request
    const reqBody = await req.json();

    //validating the data
    const result = loginUserSchema.safeParse(reqBody);
    if (!result.success) {
      return errorHandler(400, "all fields are required", result.error);
    }

    //getting the field from the result
    const { username, password } = result.data;

    //checking if user exist
    const user = await User.findOne({ username });
    if (!user) {
      return errorHandler(400, "user does not exist", null);
    }

    //checking if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return errorHandler(400, "password is incorrect", null);
    }

    //creating the token
    const accessToken = jwt.sign({ id: user._id, username:user.username }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const userToken = jwt.sign({ id: user._id, fullname:user.fullname, username:user.username, bio:user.bio, address:user.address, email:user.email }, process.env.USER_TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = apiResponse("success", 200, { user, userToken });

    response.cookies.set("accessToken", accessToken, { 
        httpOnly: true,
        sameSite:"none",
        secure: true,
        maxAge: 60 * 60 * 24 
    });

    //returning the response
    return response
  } catch (error) {
    return errorHandler(500, "something went wrong", error);
  }
}
