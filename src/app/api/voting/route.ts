import Voting from "@/core/models/step.model";
import { apiResponse } from "@/core/helpers/apiResponse";
import connectDB from "@/core/configs/connectDB";
import { errorHandler } from "@/core/helpers/errorHandler";

export async function GET(){
    try{
        //connection to database
        await connectDB()

        //getting the rating
        const voting = await Voting.find({})
        if(voting.length <= 0){
            return apiResponse("voting are empty", 200, null)
        }

        //sending voting it any
        return apiResponse("voting", 200, voting)
    }catch(error){
        return errorHandler(500, "server error", error)
    }
}