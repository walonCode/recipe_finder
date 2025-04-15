import Rating from "@/core/models/rating.model";
import { apiResponse } from "@/core/helpers/apiResponse";
import connectDB from "@/core/configs/connectDB";
import { errorHandler } from "@/core/helpers/errorHandler";

export async function GET(){
    try{
        //connection to database
        await connectDB()

        //getting the rating
        const rating = await Rating.find({})
        if(rating.length <= 0){
            return apiResponse("ratings are empty", 200, null)
        }

        //sending rating it any
        return apiResponse("ratings", 200, rating)
    }catch(error){
        return errorHandler(500, "server error", error)
    }
}