import { model,Schema, Document} from 'mongoose'

interface User extends Document {
    fullname:string
    username: string
    password: string
    email: string
    food: string[]
    votes: string[],
    ratings: string[]
    bio: string
    address:string
}

const userSchema = new Schema<User>({
    fullname: {
        type:String,
        required: true
    },
    username: { 
        type: String, 
        required: true,
        unique: true 
    },
    bio: {
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    food: [{
        type: Schema.Types.ObjectId, 
        ref: 'Food'
    }],
    ratings:[{
        type: Schema.Types.ObjectId,
        ref: 'Rating'
    }],
    votes:[{
        type: Schema.Types.ObjectId,
        ref: 'Voting'
    }]
},{ timestamps: true });

const User = model('user', userSchema);

export default User