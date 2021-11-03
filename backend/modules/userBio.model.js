const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bioSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    dateofbirth: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const bios = mongoose.model("bios", bioSchema);

module.exports = bios;
