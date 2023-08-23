const express = require("express");
const path = require("path");
const fs = require('fs');
const jsonData = require("./db/db.json");
const uuid = require("./helpers/uuid");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));

    console.log(`${req.method} received to get notes page`);
});

app.get("/api/notes", (req, res) => res.json(jsonData));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));

    console.log(`${req.method} recieved to get start page`);
});

app.listen(PORT, () => 
    console.log(`App listneing at http://localhost:${PORT}`)
);

