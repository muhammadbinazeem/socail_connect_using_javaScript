const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
  },
  caption: {
    type: String,
  },
  likes: [
    {
      userid: {
        type: String,
        required: true,
      },
    },
  ],
});

const posts = mongoose.model("posts", postSchema);

module.exports = posts;
