import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext'

function Addnote(props) {
    const context = useContext(noteContext)
    const {addNote } = context
    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleOnclick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        props.showAlert("New Note is added successfully","success")
        setnote({title:"",description:"",tag:""})
    }
    const onChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add Notes</h2>
            <div className="container my-3">
        <form >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" value={note.title} className="form-control" onChange={onChange} name='title' id="title" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" value={note.description} name='description' className="form-control" onChange={onChange} id="description"/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" value={note.tag} className="form-control" onChange={onChange} name='tag' id="tag" aria-describedby="emailHelp"/>
        </div>
        

        <button type="submit" className="btn btn-primary" onClick={handleOnclick} disabled={note.title.length<3||note.description.length<5}>Add Note</button >
      </form>
      </div>
      
      </div>
    )
}

export default Addnote
