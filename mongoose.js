const mongoose = require("mongoose");

//specific db connection
mongoose.connect("mongodb://localhost:27017/til", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//initialize variable that contains the connection to the collection db
const tilDB = mongoose.connection;

//ask Bob about this
tilDB.on("error", console.error.bind(console, "connection error:"));

//set up schema => shape of the data
const tilSchema = new mongoose.Schema({
  title: String,
  author: String,
  text: String,
  topic: String,
  when: Date,
  tag: Array,
});

//first arg = collection in db, if collection doesnt exist mongo will make it, and second is the schema prototype
const TilModel = mongoose.model("tils", tilSchema);

module.exports = TilModel;
