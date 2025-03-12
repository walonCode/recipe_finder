import { configureStore } from "@reduxjs/toolkit"
import voteReducer from "./features/voting/votingSlice"
import ratingReducer from "./features/rating/ratingSlice"
import foodReducer from "./features/food/foodSlice"
import stepReducer from "./features/step/stepSlice"

export const store = configureStore({
    reducer: {
        vote: voteReducer,
        rating: ratingReducer,
        food: foodReducer,
        step: stepReducer
    }

})

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch