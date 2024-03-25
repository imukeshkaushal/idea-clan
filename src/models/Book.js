const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
