const express = require("express");
const router = express.Router();
const { readFromFile } = require('../helpers/fsUtils');
const uuid = require("../helpers/uuid");
const fs = require('fs');
const path = require("path");

// This route deletes notes in the db file based on the id passed to the get request from the front end. 
router.delete("/api/notes/:id", (req, res) => {
    console.log(`${req.method} recieved to delete note`);
    const targetNote = req.params.id;
    readFromFile("./db/db.json").then((data) => { 
        const notes = JSON.parse(data); 
        const index = notes.findIndex((note) => note.id === targetNote);
        if (index !== -1) {
            notes.splice(index, 1);
            } else {
                res.status(500).json("Error deleting note!");
            }
        // If the value assigned to index is a valid index in the data array, it will be spliced from the array, if not, an error will be returned. 

        fs.writeFile("./db/db.json", JSON.stringify(notes), "utf-8", (err) => { // This writes the updated array back to the database file. 
            if (err) {
                res.status(500).json("Error updating file after deleting note.")
            } else {
                res.status(204).json("File updated after deleting.");
            }
        }); // Once the target note has been deleted, writeFile takes the updated data assigned to notes and converts it back to json format via stringify, then writes it back into the db.json file to update it. 
    });
});

module.exports = router;