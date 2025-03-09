import {  model, Schema,Document } from "mongoose";

interface Food extends Document {
    name: string;
    origin: string;
    ingredient: string[];
    steps: string[];
    voting: string[];
    rating: string[];
    userId: string | undefined
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
    voting: [{
        type: Schema.Types.ObjectId,
        ref:"Voting"
    }],
    rating: [{
        type: Schema.Types.ObjectId,
        ref:"Rating"
    }],
    userId: {
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
},{ timestamps: true });

const Food = model('food', foodSchema);

export default Food