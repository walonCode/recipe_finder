import {  model, Schema,Document, models } from "mongoose";

interface Food extends Document {
    name: string;
    origin: string;
    ingredient: string[];
    steps: string[];
    votes: string[];
    ratings: string[];
    userId: string | undefined;
    username: string,
    image:string
}

const foodSchema = new Schema<Food>({
    name: {
        type:String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    ingredient:{
        type: [String],
        required: true
    },
    steps: [{
        type: Schema.Types.ObjectId,
        ref:"Step"
    }],
    votes: [{
        type: Schema.Types.ObjectId,
        ref:"Voting"
    }],
    ratings: [{
        type: Schema.Types.ObjectId,
        ref:"Rating"
    }],
    userId: {
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    image:{
        type:String,
    }
},{ timestamps: true });

const Food = models.food ||  model('food', foodSchema);

export default Food