import express from 'express';
import cors from "cors";
import pool from "./db.js"

const app=express();

app.use(cors());//to enable cors so that react app can communicate with this server 
app.use(express.json());//parse incomming json requests and puts the data inside req.body

app.get("/",(req,res)=>{
    res.send("backend is working!");
});
//to get all notes
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
});
//to get notes by id
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
});
//to create a note
app.post("/notes",async(req,res)=>{
    try{
    const note_title=req.body.title;
    const note_content=req.body.content;
    if(!note_title){
        return res.status(400).send("Note title is empty! Please add title")
    }
    else{
    const create_note= await pool.query(
        "INSERT INTO notes (title,content) VALUES($1,$2) RETURNING *",[note_title,note_content] 
    )
    res.status(201).json(create_note.rows[0]);
}
}
    catch(err){
        res.status(500).send("server error");
    }
});

//to update a note
app.put("/notes/:id",async(req,res)=>{
    try{
        const note_id=req.params.id;
        const updated_title=req.body.title;
        const updated_content=req.body.content;
        const update_note=await pool.query(
            "UPDATE notes SET title = $1, content = $2 WHERE id=$3 RETURNING * ",[updated_title,updated_content,note_id]
        )
        if(update_note.rowCount===0)
            return res.status(404).send("id does not exist");
        else
        res.status(200).json(update_note.rows[0]);
    }
    catch(err){
        res.status(500).send("server error");
    }
});

//delete a note
app.delete("/notes/:id",async(req,res)=>{
    try{
    const del_note_id=req.params.id;
    const delete_note=await pool.query(
        "DELETE FROM notes WHERE id=$1 RETURNING *",[del_note_id]
    )
    if(delete_note.rowCount===0){
        return res.status(404).send("Note not found, check note id!");
    }
        res.status(200).json(delete_note.rows[0]);
    }
    catch(err){
        res.status(500).send("server error");
    }
});

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});