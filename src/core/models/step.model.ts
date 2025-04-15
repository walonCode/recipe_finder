import {model,Schema, Document, models} from 'mongoose';

interface Step extends Document {
    foodId: string | undefined
    step: string[]
    username:string,
    userId: string | undefined
}

const stepsSchema = new Schema<Step>({
    foodId: {
        type: Schema.Types.ObjectId,
        ref:"Food",
        required:true
    },
    step: [{
        type: String,
        required: true  
    }],
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

const Step = models.step ||  model('step', stepsSchema);  

export default Step