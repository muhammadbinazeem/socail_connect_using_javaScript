const router = require("express").Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
let posts = require("../modules/Post.models");
let users = require("../modules/users.model");
const auth = require("../middleware/auth");
let bios = require("../modules/userBio.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.route("/").post([auth, upload.single("file")], (req, res) => {
  const userid = req.userid._id;

  console.log(userid);
  let name;

  bios
    .find({ userid: userid })
    .then((user) => {
      if (user[0]) {
        name = user[0].firstname + " " + user[0].lastname;
        console.log(name);

        const caption = req.body.desc;
        const photo = req.file.filename;

        const newData = { userid, name, photo, caption };

        const newPost = new posts(newData);

        newPost
          .save()
          .then(() => res.json("Post Added"))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/like").post(auth, (req, res) => {
  const userid = req.userid._id;

  posts
    .find({ _id: req.body.postid })
    .then((post) => {
      if (post[0]) {
        post[0].likes = post[0].likes.concat({ userid: userid });

        post[0]
          .save()
          .then(() => res.json("Post liked"))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get(auth, (req, res) => {
  const userid = req.userid._id;

  console.log(userid);
  let name;

  posts
    .find({})
    .then((post) => {
      res.send(post);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/liked").get(auth, (req, res) => {
  const postid = req.body.postid;
  posts
    .find({ _id: postid })
    .then((post) => {
      if (post[0]) {
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/requestt").get(auth, (req, res) => {
  console.log("in request");
  console.log(req.userid._id);
  users
    .find({ _id: req.userid._id })
    .then((user) => {
      if (user[0]) {
        console.log(user[0]._id);
        console.log(user[0].requests);
        res.send(user[0].requests);
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
