const Express  = require("express")
const Cors  = require("cors")
const Mongoose  = require("mongoose")
const jwt  = require("jsonwebtoken")
const Bcypt  = require("bcrypt")

let  app = Express()


app.get("/", (req,res) => {
    res.send("hellooo")
})

app.listen(3000,() => {
    console.log("Server Started")
})