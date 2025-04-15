import { createSlice,createEntityAdapter,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/core/api/axiosInstance";
import { RootState } from "../../store";
import {  Rating, RatingSlice } from "@/core/types/types";

const ratingAdaptor = createEntityAdapter<Rating, string>({
    selectId: (rating) => rating._id,
    sortComparer: (a,b) => (b._id ?? "").localeCompare(a._id ?? "") 
})

const initialState:RatingSlice = ratingAdaptor.getInitialState({
    status:"idle",
    error:null
})



export const getAllRating = createAsyncThunk('rating/getAllFoodRating', async (_,{ rejectWithValue }) => {
    try{
        const response = await axiosInstance.get(`/ratings`)
        return response.data.data as Rating[]
    }catch(error){
        console.error(error)
        return rejectWithValue("Failed to fetch rating")
    }
})

export const deleteRating = createAsyncThunk('rating/deleteRating', async (id:string,{ rejectWithValue }) => {
    try{
        const response = await axiosInstance.delete(`/ratings/${id}`)
        return response.data.data as {id: string}
    }catch(error){
        console.error(error)
        return rejectWithValue("Failed to delete rating")
    }
})

const ratingSlice = createSlice({
    name:"rating",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getAllRating.pending, (state ) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(getAllRating.fulfilled, (state,action) => {
            ratingAdaptor.setAll(state, action.payload)
        })
        .addCase(getAllRating.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.payload as string
        })
        .addCase(deleteRating.fulfilled, (state,action) => {
            ratingAdaptor.removeOne(state, action.payload.id)
        })
        .addCase(deleteRating.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.payload as string
        })
    }
})


export const {
    selectAll:selectAllRating,
    selectById:selectRatingById,
    selectIds:getRatingIds
} = ratingAdaptor.getSelectors((state:RootState) => state.rating)

export default  ratingSlice.reducer