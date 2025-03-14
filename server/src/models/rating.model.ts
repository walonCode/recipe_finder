import {models, model, Schema, Document} from 'mongoose';

interface Rating extends Document {
    foodId: string | undefined;
    rating: number;
    userId: string | undefined;
    username: string
}

const ratingSchema = new Schema<Rating>({
    foodId: {
        type: Schema.Types.ObjectId,
        ref: "Food",
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

const Rating = models.rating || model<Rating>('rating', ratingSchema);

export default Rating