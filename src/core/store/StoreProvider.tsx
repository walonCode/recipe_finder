"use client"

import { Provider } from "react-redux"
import { store } from "./store"
import { getAllFood } from "./features/food/foodSlice"
import { getAllRating } from "./features/rating/ratingSlice"
import { getAllSteps } from "./features/step/stepSlice"
import { getTotalVote } from "./features/voting/votingSlice"

store.dispatch(getAllFood())
store.dispatch(getAllRating())
store.dispatch(getAllSteps())
store.dispatch(getTotalVote())


export default function StoreProvider ({children}:{children:React.ReactNode}) {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}