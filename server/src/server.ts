import express from 'express';
import { config } from 'dotenv';
import connectDB from './configs/connectDB';
import cors from 'cors';
import corsOption from './configs/corsOption';

config()

const app = express()

//common middleware
app.use(express.json())
app.use(cors(corsOption))


app.get('/', (req, res) => {
    res.send('Hello World!')
})



export default app;
