require("dotenv").config();
var express = require("express");
var router = express.Router();
let users = require("../modules/users.model");

router.route("/send").post((req, res) => {
  console.log("in mail");
  const email = req.body.email;

  const mailjet = require("node-mailjet").connect(
    process.env.API_KEY,
    process.env.API_SECRET_KEY
  );
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "mbam096@gmail.com",
          Name: "Muhammad bin",
        },
        To: [
          {
            Email: email,
          },
        ],
        Subject: "Reset Password",
        TextPart: "reset password",
        HTMLPart: "reset password code: 6Qedu69i",
        CustomID: "AppGettingStartedTest",
      },
    ],
  });
  request
    .then((result) => {
      res.send("done");
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
});

module.exports = router;
