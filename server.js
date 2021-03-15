//bring in .env file
require("dotenv").config();

//------------imports-----------//
const mongoose = require("mongoose");
const express = require("express");
//how to  link to the db authentication located in .env
const user = process.env.USER;
const password = process.env.PASSWORD;
//import mongoose model
const TilModel = require("./mongoose.js");
const path = require("path");

//----------Security----------//
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const create = require("./mongoose.js");

//----------Global Variables----------//
//this server will operate on port 5000
const port = process.env.PORT || 5000;
//intiliazing static folder path in variable
const staticDir = path.resolve("./client/public");

//---------Database Setup----------//

//---------------SERVER SETUP -------------//

const app = express();
//static server connecting public folder
app.use(express.static(staticDir));

//middleware for helping read form body on post request
app.use(express.urlencoded({ extended: true }));

//-------------Home Page -----------------//
//api end point for creating new db entry on home page
app.post("/create", async (req, res) => {
  console.log(`app.post/create`);
  //intercepting the req.body and adding the exact current date to the object
  //transferring the req.body to an intermediate variable
  let data = req.body;
  //setting up the data structure before sending to db
  let newBody = {
    title: data.title,
    text: data.text,
    author: data.author,
    tag: data.tag,
    when: new Date(),
    _id: data._id,
  };

  //new instance  of TilModel class
  let newEntry = new TilModel(newBody);
  //saving the new entry to db
  await newEntry.save();

  //status will return an http code and a message so that it doesn't just hang
  //------Look INTO status CODES--------//
  res.status(200).send("Success");
});

//----------Write Page------------//

//post route for update/edit form
app.post("/update/:id", async (req, res) => {
  //intermediate variable for body request
  let data = req.body;
  //intermediate variable for params
  let _id = req.params.id;

  // Query db by single id and then updates the document that matches according to data from update form
  let findUpdateEntry = await TilModel.findByIdAndUpdate(_id, data, {
    returnOriginal: false,
  });

  res.status(200).send("Success");
});

//post route for delete button
app.post("/delete/:id", async (req, res) => {
  let _id = req.params.id;
  console.log({ _id });
  await TilModel.findByIdAndDelete(_id);
  res.status(200).send("Success");
});

//route for specific entry on write page
app.get("/journal/:id", async (req, res) => {
  console.log(`/facts/:id`);
  let id = req.params.id;
  console.log(id);
  const cursor = await TilModel.findById(id);

  res.send(cursor);
});

//--------------------Read Page-------------------//
//api endpoint for querying db on read page
app.get("/facts", async (req, res) => {
  //cursor
  const cursor = await TilModel.find({});
  //intermediate array to put db collection in
  let results = [];
  //iterate through each document in collection and push it into array
  await cursor.forEach((entry) => {
    results.push(entry);
  });

  //respond to the fetch with the array of objects
  res.json(results);
});

//catch all for the home page
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/public/index.html"));
});

//sets up the server to listen for the correct port => 5000 in this case
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
