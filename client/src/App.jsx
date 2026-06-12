import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [notes,setNotes]=useState([]);
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");

  const fetchNotes = async()=>{
    const response=await axios.get("http://localhost:5000/notes");
    setNotes(response.data);
    console.log(response.data);
  };

  const addNote= async()=>{
    try{
    await axios.post("http://localhost:5000/notes",
      {title,
       content
      }
    );
    fetchNotes();
    setTitle("");
    setContent("");
  }
  catch(err){
    console.error(err);
  }
  };

  useEffect(()=>{
    fetchNotes();
  },[]);

  return (
    <>
      <h1>Notes App</h1>

 <input 
      type="text" 
      placeholder="Enter title"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />

      <textarea
      placeholder="Enter your note content"
      value={content}
      onChange={(e)=>setContent(e.target.value)}
      />
      <button onClick={addNote}>Add note</button>

      <p>Title: {title}</p>
      <p>Content: {content}</p>

      {notes.map((note)=>(
        <div key={note.id}>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
        </div>
      ))}

     
    </>
  );
}// coyyyduuuuuu deeeaaarrrrrr lalalalalalalala o myyyy dumboodaaaaaaaaaaaaa o my daaaaaaaaarlingggggggggggg

export default App;

