import Step from "@/core/models/step.model";
import { apiResponse } from "@/core/helpers/apiResponse";
import connectDB from "@/core/configs/connectDB";
import { errorHandler } from "@/core/helpers/errorHandler";

export async function GET(){
    try{
        //connection to database
        await connectDB()

        //getting the rating
        const step = await Step.find({})
        if(step.length <= 0){
            return apiResponse("ratings are empty", 200, null)
        }

        //sending step it any
        return apiResponse("steps", 200, step)
    }catch(error){
        return errorHandler(500, "server error", error)
    }
}