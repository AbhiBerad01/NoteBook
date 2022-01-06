import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const initialNotes = [
    ]

    const [notes, setNotes] = useState(initialNotes)
    // api call host
    const host = 'http://localhost:5000'
    //Fetching all notes
    const getallNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json)
    }


    //Add New Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body : JSON.stringify({title,description,tag})
        });
        const json = await response.json()
        
        setNotes(notes.concat(json))
    }

    //Delete Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            
        });
        const json = response.json()
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
        
    }

    //Update Note
    const editNote = async(id,title,description,tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body : JSON.stringify({title,description,tag})
        });
        const json = response.json()
        let newNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if(element._id === id){
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setNotes(newNote)

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getallNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
