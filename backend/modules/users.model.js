const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 11,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 8,
    },
    requests: [
      {
        userid: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    return token;
  } catch (err) {
    console.log(err);
  }
};

const users = mongoose.model("users", userSchema);

module.exports = users;
