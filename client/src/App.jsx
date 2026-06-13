import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [notes,setNotes]=useState([]);
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [editId,setEditId]=useState(null);
  const [editTitle,setEditTitle]=useState("");
  const [editContent,setEditContent]=useState("");

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

  const deleteNote= async (id)=>{
    try{
    await axios.delete(`http://localhost:5000/notes/${id}`);
    fetchNotes();
    }
    catch(err){
      console.error(err);
    }
  }

  const updateNote=async()=>{
    try{
      await axios.put(`http://localhost:5000/notes/${editId}`,{
        title:editTitle,
        content:editContent
      });
      fetchNotes();
      setEditId(null);
    }
    catch(err){
    console.error(err);
    }
  }

  const startEditting=async(note)=>{
    setEditId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
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

      {notes.map((note)=>(
        <div key={note.id}>
          
          {(editId===note.id)?
          (//form to edit and save
          <>
           <input 
           type="text"
           placeholder="Enter title"
           value={editTitle}
           onChange={(e)=>setEditTitle(e.target.value)}
           />

           <textarea
           placeholder="Enter content"
           value={editContent}
           onChange={(e)=>setEditContent(e.target.value)}
           />
            <button onClick={updateNote}>Save</button>
           </>
          ):
          (
            <>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          <button onClick={()=>startEditting(note)}>Edit note</button>
          <button onClick={()=>deleteNote(note.id)}>Delete note</button>
          </>
          )
          }
        
        </div>
      ))}

     
    </>
  );
}// coyyyduuuuuu deeeaaarrrrrr lalalalalalalala o myyyy dumboodaaaaaaaaaaaaa o my daaaaaaaaarlingggggggggggg

export default App;

