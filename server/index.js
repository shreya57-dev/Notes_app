import express from 'express';
import cors from "cors";
import pool from "./db.js"

const app=express();

app.use(cors());//to enable cors so that react app can communicate with this server 
app.use(express.json());//parse incomming json requests and puts the data inside req.body

app.get("/",(req,res)=>{
    res.send("backend is working!");
});

app.get("/notes",async(req,res)=>{
    try{
    const get_notes =await pool.query(
        "SELECT * FROM notes"
    );
    res.json(get_notes.rows);
}
catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
}

app.get("/notes/:id",async(req,res)=>{
    try{
        const get_note_by_id=await pool.query(
            "SELECT * FROM notes WHERE id=$1",[req.params.id]
        );
        if(get_note_by_id.rows.length === 0){
            res.status(404).send("Note not found!");
        }
        else
        return res.json(get_note_by_id.rows[0]);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
})

})

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});