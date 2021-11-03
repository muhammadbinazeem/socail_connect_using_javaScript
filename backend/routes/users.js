const auth = require("../middleware/auth");
var express = require("express");
var router = express.Router();
let users = require("../modules/users.model");
let bios = require("../modules/userBio.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const e = require("express");

/* GET users listing. */
router.route("/").get(auth, function (req, res, next) {
  const userid = req.userid._id;
  console.log(userid);
  res.send(userid);
});

router.route("/signup").post(async (req, res) => {
  const email = req.body.email;
  const temppassword = req.body.password;

  users
    .find({ email: email })
    .then(async (user) => {
      if (!user[0]) {
        const saltvalue = await bcrypt.genSaltSync(10);
        const password = await bcrypt.hashSync(temppassword, saltvalue);

        const newUser = new users({ email, password });

        newUser
          .save()
          .then(() => {
            users
              .find({ email: email })
              .then((user) => {
                console.log(user[0]);
                res.send(user[0]._id);
              })
              .catch((err) => res.status(400).json("Error: " + err));
          })
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        res.send("user already exists!");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/signin").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  users
    .find({ email: email })
    .then((user) => {
      const pass = bcrypt.compareSync(password, user[0].password);
      console.log(pass);
      if (pass === true) {
        const token = jwt.sign({ _id: user[0]._id }, process.env.SECRET_KEY);
        return res.send(token);
      } else {
        return res.json("not-authenticated");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/forgetpassword").patch((req, res) => {
  const email = req.body.email;
  const verificationCode = req.body.code;
  const temppassword = req.body.password;
  if (verificationCode === "123456") {
    users
      .find({ email: email })
      .then(async (user) => {
        if (user[0]) {
          const saltvalue = await bcrypt.genSaltSync(10);
          const password = await bcrypt.hashSync(temppassword, saltvalue);
          user[0].password = password;
          user[0]
            .save()
            .then(() => {
              res.send("updated");
            })
            .catch((err) => res.status(400).json("Error: " + err));
        } else {
          res.send("user does not exists");
        }
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    res.send("incorrect code!");
  }
});

router.route("/updatepassword").patch(auth, (req, res) => {
  const userid = req.userid._id;
  const temppassword = req.body.password;
  console.log(temppassword);
  users
    .find({ userid: userid })
    .then(async (user) => {
      if (user[0]) {
        const saltvalue = await bcrypt.genSaltSync(10);
        const password = await bcrypt.hashSync(temppassword, saltvalue);
        user[0].password = password;
        user[0]
          .save()
          .then(() => {
            res.send("updated");
          })
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        res.send("user does not exists");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addbio").post((req, res) => {
  //console.log(req.userid._id);
  const { firstname, lastname, dateofbirth, userid } = req.body;
  //const userid = req.userid._id;
  bios
    .find({ userid: userid })
    .then((user) => {
      if (!user[0]) {
        const bio = bios({ userid, firstname, lastname, dateofbirth });
        bio
          .save()
          .then(() => {
            res.json("bio added!");
          })
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        res.send("bio already added!");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/total").get(function (req, res, next) {
  bios
    .find({})
    .then((user) => {
      res.send(user);
    })
    .catch((err) => console.log(err));
});

router.route("/:id").get((req, res) => {
  bios
    .find({ userid: req.params.id })
    .then((user) => {
      res.send(user[0]);
    })
    .catch((err) => console.log(err));
});

router.route("/:id").get((req, res) => {
  bios
    .find({ userid: req.params.id })
    .then((user) => {
      res.send(user[0]);
    })
    .catch((err) => console.log(err));
});

router.route("/sendrequest").post(auth, (req, res) => {
  const sendid = req.body.userid;
  console.log("sendkrniha", sendid);
  console.log("userid", req.userid._id);
  let name;
  users
    .find({ _id: sendid })
    .then((user) => {
      if (user[0]) {
        bios.find({ userid: req.userid._id }).then((bio) => {
          if (bio[0]) {
            console.log(bio[0]);
            name = bio[0].firstname;

            user[0].requests = user[0].requests.concat({
              userid: req.userid._id,
              name: name,
            });

            user[0]
              .save()
              .then(() => res.json("request send"))
              .catch((err) => res.status(400).json("Error: " + err));
          }
        });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
