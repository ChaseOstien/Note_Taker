const express = require("express");
const router = express.Router();
const { readFromFile } = require('../helpers/fsUtils');
const uuid = require("../helpers/uuid");
const fs = require('fs');
const path = require("path");

router.delete("/api/notes/:id", (req, res) => { //This defines a delete requests made to the /api/notes/:id route when the deleteNote fetch request is called to to /api/notes/:id after clicking the delete button. 
    console.log(`${req.method} recieved to delete note`);
    const targetNote = req.params.id; // This line sets targetNote equal to the note id sent in the delete request.
    readFromFile("./db/db.json").then((data) => { // This reads from the db.json file and assigns the file content to the data variable. 
        const notes = JSON.parse(data); // This parses the json content in the file. 
        const index = notes.findIndex((note) => note.id === targetNote); // This finds the array index of the note who's id matches the value assigned to targetNote.
        if (index !== -1) {
            notes.splice(index, 1);
            } else {
                res.status(500).json("Error deleting note!");
            }
        // If the value assigned to index is a valid index in the data array, it will be spliced from the array, if not, an error will be returned. 

        fs.writeFile("./db/db.json", JSON.stringify(notes), "utf-8", (err) => { 
            if (err) {
                res.status(500).json("Error updating file after deleting note.")
            } else {
                res.status(204).json("File updated after deleting.");
            }
        }); // Once the target note has been deleted, writeFile takes the updated dta assigned to notes and converts it back to json format via stringify, then writes it back into the db.json file to update it. 
    });
});

module.exports = router;