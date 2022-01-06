import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from "../components/Noteitems"
import { useNavigate } from "react-router-dom";

function Notes(props) {
    const navigate = useNavigate();
    const {showAlert}=props
    const context = useContext(noteContext)
    const { notes, getallNotes,editNote } = context
    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})
    const ref = useRef(null)
    const refClose = useRef(null)
    useEffect(() => {
        if(localStorage.getItem("token")){
            getallNotes()
        }else{
            navigate('/login')
        }
        // eslint-disable-next-line 
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    const handleOnclick =(e)=>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        props.showAlert("Note updated Successfully","success")
        

    }
    const onChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" onChange={onChange} name='etitle' id="etitle" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} name='edescription' className="form-control" onChange={onChange} id="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" onChange={onChange} name='etag' id="etag" aria-describedby="emailHelp" />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleOnclick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-2 row my-3">
                <h2>You Notes</h2>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem showAlert={showAlert} key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes
