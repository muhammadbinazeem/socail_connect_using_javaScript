var express = require("express");
var router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
let googles = require("../modules/googleusers.model");
var jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("google");
});

router.route("/login").post(async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email } = ticket.getPayload();
  googles.find({ email: email }).then((user) => {
    if (user[0]) {
      const token = jwt.sign({ _id: user[0]._id }, process.env.SECRET_KEY);
      return res.send(token);
    } else {
      res.send("signUp first");
    }
  });
});

router.route("/signup").post(async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email } = ticket.getPayload();
  googles.find({ email: email }).then((user) => {
    if (!user[0]) {
      const newUser = new googles({ email, name });
      newUser.save().then((user) => {
        console.log(user._id);
      });
      return res.send(true);
    } else {
      res.send("user already exists!");
    }
  });
});

module.exports = router;
