import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { AddFood, Food, FoodSlice, UpdateFood } from "../../../lib/types";
import { axiosInstance } from "../../../api/axiosInstance";
import { RootState } from "../../store";

const foodAdapter = createEntityAdapter<Food, string>({
    selectId: (food) => food._id,
    sortComparer: (a, b) => (b._id ?? "").localeCompare(a._id ?? ""),
});

export const addFood = createAsyncThunk('food/addFood', async (food: AddFood, { rejectWithValue }) => {
    try {
        const { name, origin, ingredient } = food;
        if (!name || !origin || !ingredient) {
            return rejectWithValue("All fields are required");
        }
        const response = await axiosInstance.post("/foods", {
            name,
            origin,
            ingredient
        });
        console.log(response.data);
        return response.data.data as Food;
    } catch (error) {
        console.error(error);
        return rejectWithValue("Failed to add food");
    }
});

export const getAllFood = createAsyncThunk('food/getAllFood', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/foods");
        return response.data.data as Food[];
    } catch (error) {
        console.error(error);
        return rejectWithValue("Failed to fetch food");
    }
});

export const updateFood = createAsyncThunk('food/updateFood', async (food: UpdateFood, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.patch(`/foods/${food._id}`, food);
        return response.data.data as Food;
    } catch (error) {
        console.error(error);
        return rejectWithValue("Failed to update food");
    }
});

export const deleteFood = createAsyncThunk('food/deleteFood', async (id: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/foods/${id}`);
        return response.data.data as Food;
    } catch (error) {
        console.error(error);
        return rejectWithValue("Failed to delete food");
    }
});

const initialState: FoodSlice = foodAdapter.getInitialState({
    status: "idle",
    error: null
});

const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addFood.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addFood.fulfilled, (state, action) => {
                state.status = "succeeded";
                foodAdapter.upsertOne(state, action.payload);
            })
            .addCase(addFood.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(getAllFood.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAllFood.fulfilled, (state, action) => {
                state.status = "succeeded";
                foodAdapter.upsertMany(state, action.payload);
            })
            .addCase(getAllFood.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(deleteFood.fulfilled, (state, action) => {
                state.status = "succeeded";
                foodAdapter.removeOne(state, action.payload._id ?? "");
            })
            .addCase(deleteFood.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(updateFood.fulfilled, (state, action) => {
                state.status = "succeeded";
                foodAdapter.upsertOne(state, action.payload);
            })
            .addCase(updateFood.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export const {
    selectAll: selectAllFood,
    selectById: selectFoodById,
    selectIds: getFoodIds
} = foodAdapter.getSelectors((state: RootState) => state.food);

export default foodSlice.reducer;
