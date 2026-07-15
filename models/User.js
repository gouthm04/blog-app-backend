const Mongoose = require("mongoose")


const userSchema = Mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        phone : String,
        email : {
            type : String ,
            required : true
        },
        password : {
            type : String,
            required : true 
        }
    }
)

const userModel = Mongoose.model("User", userSchema);

module.exports = userModel;