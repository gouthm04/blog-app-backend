const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("./models/Users");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://goutham:goutham123@cluster0.umdwywd.mongodb.net/blogDB",
);

app.post("/signup", (req, res) => {
  let input = req.body;
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  userModel
    .find({ email: req.body.email })
    .then((items) => {
      if (items.length > 0) {
        res.json({ status: "Email ID already exists " });
      } else {
        let result = new userModel(input);
        result.save();
        res.json({ status: "success" });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/test", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log("Server Started");
});
