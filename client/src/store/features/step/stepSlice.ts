import { createSlice,createEntityAdapter,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axiosInstance";
import { RootState } from "../../store"; 
import { AddStep, Step, StepSlice } from "../../../lib/types";

const stepAdaptor = createEntityAdapter<Step, string>({
    selectId: (step) => step._id,
    sortComparer: (a,b) => (b._id ?? "").localeCompare(a._id ?? "") 
})

const initialState:StepSlice = stepAdaptor.getInitialState({
    status:"idle",
    error:null
})

export const addStep = createAsyncThunk('step/addStep', async (data:AddStep,{ rejectWithValue }) => {
    try{
        const { foodId, step } = data
        if(!foodId || !step) return rejectWithValue("Missing foodId or step")
        const response = await axiosInstance.post("/steps",{
            foodId,
            step
        })
        return response.data.data as Step
    }catch(error){
        console.error(error)
        return rejectWithValue("Failed to add step")
    }
})

export const getAllSteps = createAsyncThunk('step/getAllFoodSteps', async (_,{ rejectWithValue }) => {
    try{
        const response = await axiosInstance.get('/steps')
        return response.data.data as Step[]
    }catch(error){
        console.error(error)
        return rejectWithValue("Failed to fetch steps")
    }
})

export const deleteStep = createAsyncThunk('step/deleteStep', async (id:string,{ rejectWithValue }) => {
    try{
        const response = await axiosInstance.delete(`/steps/${id}`)
        return response.data.data as Step
    }catch(error){
        console.error(error)
        return rejectWithValue("Failed to delete step")
    }
});

const stepSlice = createSlice({
    name:'step',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(addStep.fulfilled, (state,action) => {
            stepAdaptor.addOne(state, action.payload)
        })
        .addCase(addStep.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.payload as string
        })
        .addCase(getAllSteps.pending, (state ) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(getAllSteps.fulfilled, (state,action) => {
            stepAdaptor.setAll(state, action.payload)
        })
        .addCase(getAllSteps.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.payload as string
        })
        .addCase(deleteStep.fulfilled, (state,action) => {            
            stepAdaptor.removeOne(state, action.payload._id ?? "")
        })
        .addCase(deleteStep.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.payload as string
        })
    }
})


export const {
    selectAll:selectAllStep,
    selectById:selectStepById,
    selectIds:getStepIds
} = stepAdaptor.getSelectors((state:RootState) => state.step)

export default stepSlice.reducer