const notes = require('../models/noteModel');

//create new note
const newNote = (async(req,res) => {
    const {title,subject}=req.body;
    
    //fileds check
    if (!title || !subject) {
        return res.status(400).json({message:"All Fields Are Required"});	
    }

    const notesObject = {title,subject};
    const Notes = await notes.create(notesObject);

    if (Notes) {
        return res.status(201).json({message:"Notes Created"});
    }
    else{
        return res.status(400).json({message:"Failde To Create Notes"});
    }
});

//get all notes
const getAllNotes = (async(req,res) => {
    const Notes = await notes.find();

    if (!Notes?.length){
        return res.status(400).json({message:"No Notes Found"});
    }
    
    res.json(Notes);
    
});

//update notes
const updateNote = (async(req,res) => {
    const {id,title,subject}=req.body;

    if (!id || !title || !subject) {
        return res.status(400).json({message:"All Fields Are Required"});
    }

    const Notes = await notes.findById(id);
    if(!Notes){
        return res.status(400).json({message:"Notes Not Found"});
    }

    Notes.title = title;
    Notes.subject = subject;
    Notes.editedAt = Date.now();

    const updatedNote = await Notes.save();
    res.status(201).json({message:`${title} updated`});
});

//deleting a note
const deleteNote = (async(req,res) => {
    const {id} = req.body;

    if(!id) {
        return res.status(400).json({message:"Id not found"});
    }
    const Notes = await notes.findById(id);
    if (!Notes) {
        return res.status(400).json({message:"Note Not Found"});
    }

    const deletedNote = await Notes.deleteOne();
    res.json(`${deletedNote.title} deleted`);
})

module.exports = {newNote, getAllNotes,updateNote,deleteNote}