import express from 'express';
import cors from 'cors';
import records from './api/records.route.js';

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/mypet",records);
app.use('*',(req,res)=>{
    res.status(404).json({error:"not found"});
})

export default app;
