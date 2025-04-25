const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedOn: String,
  genre: String,
  rating: Number,
});

module.exports = mongoose.model("Book", bookSchema);
