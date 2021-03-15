//bring in .env file
require("dotenv").config();
//JSON web token
//must install library npm install jsonwebtoken | also install bcrypt for serverside storage of sensitive password in db
// const jwt = require("jsonwebtoken"); //need to install
// const bcypt = require("bcrypt"); //need to install
// let userIn = {
//   username: "User",
//   pass: "password12345",
//   admin: false,
// };

// //this is bcypt code | need to import

// //plug it all in a async function
// async function hashAndStore() {
//   //dont hard code in salt rounds => store it in .env
//   let hashedPass = bcrypt.hash(userIn.pass, parseInt(process.env.SALT)); //rounds must be a number

//   const tokenContent = {
//     username: userIn.username,
//     pass: hashedPass,
//     admin: userIn.admin,
//   };

//   //signed JWT
//   //tokenContent is the actual JSON object credentials | the SALT is the junk
//   //we get the hash signedToken from passing into jwt the object credentials and the junk SALT
//   const signedToken = jwt.sign(tokenContent, process.env.SECRET, {
//     expiresIn: 2,
//   }); //jumble them up and encrypt | takes a third argument that is an object containing expiresIn: <time period>
//   console.log(signedToken); //can log it out to see the hash

//   //use setTimeout to verify token after a certain amount of times
//   const verified = jwt.verify(signedToken, process.env.SECRET); //decrypt
//   console.log(verified); //decrypt the hash => adds a new property iat: <timestamp>

//   let comparison = await bcypt.compare(userIn.pass, hashedPass); // compare the stored hash pass second arg, to user input pass
//}

//--------imports------//
//import mongoose
const mongoose = require("mongoose");
const express = require("express");
//how to  link to the db authentication located in .env
const user = process.env.USER;
const password = process.env.PASSWORD;
// const TilModel = require("./mongoose.js");
const path = require("path");
const Strategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//----------Global Variables----------//
//this server will operate on port 5000
const port = process.env.PORT || 5000;
//intiliazing static folder path in variable
const staticDir = path.resolve("./client/public");

//-----------Auth SetUp------------///
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};
//strategy is a constructor  | make this an async to avoid callback hell
passport.use(
  new Strategy(options, async (token, done) => {
    let userData = await UserModel.findOne({ _id: token.sub }); //coming from the db
    if (userData) {
      return done(null, userData);
    }
  })
);

//-----issue JWT for user on Login-----//
function createJWT(user) {
  //stored in special object
  const payload = {
    sub: user._id,
    iat: Date.now(),
  };
  const signedJWt = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
  return {
    token: signedJWt,
    expiresIn: "1d",
  };
}

//---------Database Setup----------//

mongoose.connect("mongodb://localhost:27017/auth");

const UserSchema = mongoose.Schema({
  username: String,
  pass: String,
});

//UserModel is similar to a class and then we will generate instances of the class
const UserModel = mongoose.model("users", UserSchema);

//creates new db
// let seedUser = new UserModel({
//   username: "user",
//   pass: "password",
// });

// seedUser.save();

//--------SERVER SETUP ------//

const app = express();
//static server connecting public folder
app.use(express.static(staticDir));
app.use(passport.initialize());
//middleware for helping read form body on post request
app.use(express.urlencoded({ extended: true }));

//api end point for create
app.post("/dashboard", async (req, res) => {
  //transferring the req.body to an intermediate variable
  let formEntry = req.body;

  //not a cursor because using findOne vs just find which will return cursor
  let userObj = await UserModel.findOne({ username: formEntry.username });

  console.log(userObj);

  //need to guard against duplicate usernames
  //use bcrypt hash password from db when comparing
  if (userObj && userObj.pass === formEntry.pass) {
    let issuedToken = createJWT(userObj);

    res.status(200).json({ token: issuedToken });
  } else {
    res.status(403).send("wrong password");
  }

  //status will return an http code and a message so that it doesn't just hang
  //------Look INTO status CODES--------//
  res.status(200).send("success!");
  //cursor
  //   const cursor = await TilModel.insertOne({
  // title: formEntry

  //   });
});

//catch all for the home page
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/public/index.html"));
});

//sets up the server to listen for the correct port => 5000 in this case
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
