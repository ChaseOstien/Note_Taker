const express = require("express");
const path = require("path");
const fs = require('fs');
const jsonData = require("./db/db.json");
const uuid = require("./helpers/uuid");
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));

    console.log(`${req.method} received to get notes page`);
});

app.get("/api/notes", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
    console.log(`${req.method} received to update notes`);

    const { title, text } = req.body;

    if (title && text) {

    const newNote = {
        title,
        text,
        review_id: uuid(),
    };

    const newString = JSON.stringify(newNote);

    readAndAppend(newNote, "./db/db.json");
    

    const response = {
        body: newNote,
    };
    
    res.status(201).json(response);
    } else {
        res.status(500).json("Error in updating notes!");
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));

    console.log(`${req.method} recieved to get start page`);
});

app.listen(PORT, () => 
    console.log(`App listneing at http://localhost:${PORT}`)
);

