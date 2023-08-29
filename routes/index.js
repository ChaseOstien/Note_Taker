const express = require("express");

const deleteRouter = require("./delete");
const notesRouter = require("./notes");

const app = express();

app.use("/delete", deleteRouter);
app.use("/notes", notesRouter);

module.exports = app;