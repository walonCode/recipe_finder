import {model, Schema, Document} from 'mongoose';

interface Rating extends Document {
    foodId: string | undefined;
    rating: number;
    userId: string | undefined;
    username: string
}

const ratingSchema = new Schema<Rating>({
    foodId: {
        type: Schema.Types.ObjectId,
        required:true
    },
    rating: {
        type: Number,
        required: true,
        min:1,
        max:5   
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },
    username: {
        type: String,
        required: true
    }
},{ timestamps:true });

const Rating = model('rating', ratingSchema);

export default Rating