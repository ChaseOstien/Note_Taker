const express = require("express");
const notes = express.Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require("../helpers/uuid");
const path = require("path");

// Route to get saved notes
notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data))); 
    console.log(`${req.method} made to get saved notes`);
    
});
// Route to add a new note to the database file. 
notes.post("/", (req, res) => {  
    console.log(`${req.method} received to update notes`);

    const { title, text } = req.body;
    if (title && text) { 

    const newNote = {
        title,
        text,
        id: uuid(),
    }; 
    // appends the new note to the array in the database file. 
    readAndAppend(newNote, "./db/db.json");
    
    const response = {
        body: newNote,
    }; // Response body to be sent back to the browser. 
    
    res.status(201).json(response); 
    } else {
        res.status(500).json("Error in updating notes!"); 
    }
});

module.exports = notes;