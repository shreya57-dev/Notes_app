import express from 'express';
import cors from "cors";

const app=express();

app.use(cors());//to enable cors so that react app can communicate with this server 
app.use(express.json());//parse incomming json requests and puts the data inside req.body


app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});