const express = require("express"); //This line imports express into this project. 
const path = require("path"); // This line imports the path module into this file. This allows you to work with directories and file paths.
const fs = require('fs'); // This imports the file system module from node, allowing you to manipulate files, indluding reading and writing. 
const jsonData = require("./db/db.json"); // This line imports the data base file in this directory. 
const api = require("./routes/index");
const deleteRouter = require("./routes/delete");
const PORT = 3001; // This line assigns the server port we want to work with. 

const app = express(); // This line creates a new instance of an express application in this project.  


app.use(express.json()); // app refers to the instance of express that we created, .use() is used to set up middleware functions that will be executed on incoming HTTP requests. express.json() is a built in middleware function provided by express that is used to parse JSON data in incoming requests. It configures express to automatically parse JSON data in the request body. It will make it available as a JavaScript object on the request object. It will take data sent in a post request body, parse it and make it available at req.body. 
app.use(express.urlencoded({ extended: true })); // This middleware is used to parse data from URL-encoded forms in incoming requests. Extended true allows you to parse complex objects. 
app.use("/", deleteRouter);
app.use("/api", api);
app.use(express.static("public")); // This middleware is set up to serve static files when you access the public directory. This allows you to serve HTML, CSS and JS files such as those in the 2 send file get requests below. 

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));

    console.log(`${req.method} made to get notes page`);
}); // This section of code processes get requests made to the notes route. req contains info about the request, res contains info about the response. It calls the sendFile() method on the response, it creates an absolute path to the file that you want to serve. __dirname is a node.js variable that represents the current directory of the scripts file. Since server.js is in the Develop directory, you must then provide the path to the desired file from the root(Develop).

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));

    console.log(`${req.method} recieved to get start page`);
});

app.listen(PORT, () => 
    console.log(`App listneing at http://localhost:${PORT}`)
);

