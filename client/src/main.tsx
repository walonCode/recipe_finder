import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
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
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
    </Provider>
  </StrictMode>,
)
