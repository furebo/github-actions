import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import blogRouter from './src/routes/blogRoute.js';

dotenv.config()
const app = express();
const mongoURL =  "mongodb+srv://furebo:fode123@cluster0.rcd81.mongodb.net/furebo?retryWrites=true&w=majority";

app.use(express.json());
app.use(blogRouter);

mongoose.connect(mongoURL);
mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected.')
})

app.listen(3000,()=>{
    console.log("App listing at port 3000");
})
