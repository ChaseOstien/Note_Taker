const express = require("express");
const notes = express.Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require("../helpers/uuid");
const path = require("path");

notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data))); 
    console.log(`${req.method} made to get saved notes`);
    // This section of code proccesses get requests made on the api/notes route. req contains info about the request, res contains info about the response. It calls the read from file function on the db.json file and then passes the data read into a promise chain using .then. The data is then parsed using JSON.parse(data) and included in the response in res.json(). 
});

notes.post("/", (req, res) => { // This section of code processes post requests made to the api/notes route of our web server. req contains info about the request and res contains info about the response. 
    console.log(`${req.method} received to update notes`);

    const { title, text } = req.body; // This line extracts the title and text properties from the req.body (incoming data in the post request).

    if (title && text) { // This line checks to see if the incoming req had both a title and text(body), if truthy, it proceeds. 

    const newNote = {
        title,
        text,
        id: uuid(),
    }; // This code creates a newNotes object containing the title and text extracted from the request. It also includes a review_id that contains a value  generated by the uuid() function. 

    //const newString = JSON.stringify(newNote); // This line converts the newNote object to a JSON string using JSON.stringify.

    readAndAppend(newNote, "./db/db.json"); // This function call appends the newNote object to the specified file. The newNote object contains the data that was extracted from the body of the post request(sent from the browser).
    

    const response = {
        body: newNote,
    }; // This code creates a response object that containts the newNote as its body property. 
    
    res.status(201).json(response); // This line sends a response to the browser if title and text were truthy containing a 201 response code and the response object sent as json. 
    } else {
        res.status(500).json("Error in updating notes!"); // This line is sent if the title or text were false, sends an error code. 
    }
});

module.exports = notes;