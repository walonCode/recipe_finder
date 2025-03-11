import {model, Schema, Document} from 'mongoose';

interface Voting extends Document {
    foodId: string | undefined
    votesType: "like" | "dislike"
    userId: string | undefined
    username: string
}

const votingSchema = new Schema<Voting>({
    foodId: {
        type: Schema.Types.ObjectId,
        required:true
    },
    votesType: {
        type: String,
        enum: ['like', 'dislike'],
        required: true  
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

const Voting = model('rating', votingSchema);

export default Voting