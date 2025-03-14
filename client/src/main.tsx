import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {  HashRouter} from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { getAllFood } from './store/features/food/foodSlice.ts'
import { getAllRating } from './store/features/rating/ratingSlice.ts'
import { getAllSteps } from './store/features/step/stepSlice.ts'
import { getTotalVote } from './store/features/voting/votingSlice.ts'

store.dispatch(getAllFood())
store.dispatch(getAllRating())
store.dispatch(getAllSteps())
store.dispatch(getTotalVote())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App/>
      </HashRouter>
    </Provider>
  </StrictMode>,
)
