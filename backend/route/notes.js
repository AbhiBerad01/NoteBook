const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');


//route 1 : fetch all notes using '/api/notes/fetchnotes'
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error Occured")
      }
})

//route 2 : add new notes using '/api/notes/addnote'
router.post('/addnote', fetchuser, [
    body('title', "Please Enter a title").isLength({ min: 3 }),
    body('description', "Please Enter description greater than 5 letters").isLength({ min: 5 }),
], async (req, res) => {
    const {title,description,tag} = req.body;
    //first the request get validate as the condition as error occured it get stored in error
    const errors = validationResult(req);
    //if error occured it get display as an array
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = await new Notes({
            user : req.user.id, title,description,tag 
        })
        const saveNotes = await note.save()
        res.json(saveNotes)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error Occured")
      }
})

//route 3 : update notes using '/api/notes/updatenote'
router.put('/updatenote/:id', fetchuser,async (req, res) => {
    const {title,description,tag} = req.body;
    
    try {
       const newNote = {};
       if(title){newNote.title=title}
       if(description){newNote.description=description}
       if(tag){newNote.tag=tag}

       //verify is user is genune
       let note = await Notes.findById(req.params.id);
       if(!note){
           return res.status(404).send("Not Found")
       }
       if(note.user.toString() !== req.user.id){
           return res.status(400).send("Not Allowed")
       }
       note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
       res.json({note})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error Occured")
      }
})

//route 4 : delete notes using '/api/notes/deletenote'
router.delete('/deletenote/:id', fetchuser,async (req, res) => {
   
    
    try {
     
       //verify is user is genune
       let note = await Notes.findById(req.params.id);
       if(!note){
           return res.status(404).send("Not Found")
       }
       if(note.user.toString() !== req.user.id){
           return res.status(400).send("Not Allowed")
       }
       note = await Notes.findByIdAndDelete(req.params.id)
       res.json({"Success":"Note Has been deleted",note:note})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error Occured")
      }
})

module.exports = router;