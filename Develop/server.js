const express = require("express"); //This line imports express into this project. 
const path = require("path"); // This line imports the path module into this file. This allows you to work with directories and file paths.
const fs = require('fs'); // This imports the file system module from node, allowing you to manipulate files, indluding reading and writing. 
const jsonData = require("./db/db.json"); // This line imports the data base file in this directory. 
const api = require("./routes/index"); // This line imports the index.js api route
const deleteRouter = require("./routes/delete"); // Imports the delete router. 
const PORT = 3001; // This line assigns the server port we want to work with. 

const app = express();  

// Middleware
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
app.use("/", deleteRouter);
app.use("/api", api);
app.use(express.static("public"));  

// Routes that serve static files
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));

    console.log(`${req.method} made to get notes page`);
}); 

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));

    console.log(`${req.method} recieved to get start page`);
});

// Sets our server port
app.listen(PORT, () => 
    console.log(`App listneing at http://localhost:${PORT}`)
);

