import express from 'express';
import { config } from 'dotenv';
import connectDB from './configs/connectDB';
import cors from 'cors';
import corsOption from './configs/corsOption';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { userRouter } from './routes/user.route';
import { foodRouter } from './routes/food.route';
import { voteRouter } from './routes/voting.route';
import { ratingRouter } from './routes/rating.route';
import { stepRouter } from './routes/step.route';

config()

const app = express()

//common middleware
app.use(express.json())
app.use(cors(corsOption))


//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//auth route
app.use('/api/v1/users',userRouter)
//foood route
app.use('/api/v1/foods',foodRouter)
//voting route
app.use('/api/v1/votes',voteRouter)
//rating route
app.use('/api/v1/rating',ratingRouter)
//step route
app.use('/api/v1/step',stepRouter)


//error middleware
app.use(errorMiddleware)


export default app;
