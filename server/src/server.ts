import express from 'express';
import { config } from 'dotenv';
import connectDB from './configs/connectDB';
import cors from 'cors';
import corsOption from './configs/corsOption';
import { errorMiddleware } from './middlewares/errorMiddleware';

config()

const app = express()

//common middleware
app.use(express.json())
app.use(cors(corsOption))


//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})


//error middleware
app.use(errorMiddleware)


export default app;
