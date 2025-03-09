import {model,Schema, Document} from 'mongoose';

interface Step extends Document {
    foodId: string | undefined
    step: string
}

const stepsSchema = new Schema<Step>({
    foodId: {
        type: Schema.Types.ObjectId,
        required:true
    },
    step: {
        type: String,
        required: true  
    },
},{ timestamps:true });

const Step = model('step', stepsSchema);  

export default Step