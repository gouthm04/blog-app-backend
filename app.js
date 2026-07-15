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

// CREATE A POST

app.post("/create",async(req,res) => {
    let input = req.body 

    let token = req.headers.token

    jwt.verify(token,"blogApp",async (error,decoded) => {
        if(decoded && decoded.email) {

            let result = new postModel(input)
            await result.save()
            res.json({"status":"Success"})  
        }else {
            res.json({"status":"Invalid Authentication"})

        }
    })
})


//SIGN IN
app.post("/signIn",async(req,res)=>{

    let input =req.body
    let result=userModel.find({email:req.body.email}).then(
        (items)=>{
            if (items.length>0) {

                const passwordValidator=bcrypt.compareSync(req.body.password,items[0].password)
                if (passwordValidator) {

                    jwt.sign({email:req.body.email},"blogApp",{expiresIn:"1d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status":"error","errorMessage":error})
                                
                            } else {
                                res.json({"status":"success","token":token,"userId":items[0]._id})
                                
                            }
                        })
                    
                } else {
                    res.json({"status":"Incorrect Password"})
                    
                }
                
            } else {
                res.json({"status":"Invalid Email Id"})
                
            }

        }
    )
})

//SIGN UP
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