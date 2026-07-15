const mongoose = require("mongoose")
const userModel = require("./Users")

const postSchema = mongoose.Schema(
    {
        userId : {
            type : mongoose.Mongoose.Schema.Types.ObjectId,
            ref : "users"
        },

        Message : String,
        
        postedDate : {
            type : Date,
            default:Date.now
        }
    }
)

var postModel = mongoose.model("posts",postSchema)
module.exports = userModel