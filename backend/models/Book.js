const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  mood: String,
  img: String,
  type: { type: String, required: true }
});

module.exports = mongoose.model("Book", bookSchema);
