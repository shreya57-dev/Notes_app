import express from 'express';
import cors from "cors";
import pool from "./db.js"

const app=express();

app.use(cors());//to enable cors so that react app can communicate with this server 
app.use(express.json());//parse incomming json requests and puts the data inside req.body

app.get("/",(req,res)=>{
    res.send("backend is working!");
});


app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});