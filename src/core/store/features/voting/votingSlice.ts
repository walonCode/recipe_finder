import { createSlice,createEntityAdapter,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/core/api/axiosInstance";
import { RootState } from "../../store"; 
import { Vote, VoteSlice } from "@/core/types/types";


const voteAdaptor = createEntityAdapter<Vote, string>({
    selectId: (step) => step._id,
    sortComparer: (a,b) => (b._id ?? "").localeCompare(a._id ?? "")
})

const initialState:VoteSlice = voteAdaptor.getInitialState({
    status:"idle",
    error:null
})

export const getTotalVote = createAsyncThunk('vote/getAllFoodVote', async (_,{ rejectWithValue }) => {
    try{
        const response = await axiosInstance.get(`/voting`)
        return response.data.data as Vote[]
    }catch(error){
        console.error(error)
        return rejectWithValue("Failed to fetch votes")
    }    
})

export const deleteVote = createAsyncThunk('step/deleteVote', async (id:string,{ rejectWithValue }) => {
    try{
        const response = await axiosInstance.delete(`/voting/${id}`)
        return response.data.data as Vote
    }catch(error){
        console.error(error)
        return rejectWithValue("Failed to delete vote")
    }
})

const voteSlice = createSlice({
    name:'vote',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(getTotalVote.fulfilled,(state,action) => {
                voteAdaptor.setAll(state,action.payload)
            })
            .addCase(deleteVote.fulfilled,(state,action) => {
                voteAdaptor.removeOne(state,action.payload._id ?? "")
            })
    }
})


export const {
    selectAll:getAllVote,
    selectById:getVoteById,
    selectIds:getVoteIds
} = voteAdaptor.getSelectors((state:RootState) => state.vote)

export default voteSlice.reducer