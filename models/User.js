const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["photographer","user"],
        required:true
    },

    profilePic:{
        type:String,
        default:""
    },

    bio:{
        type:String,
        default:""
    },

    style:{
        type:String,
        default:""
    }

},{timestamps:true})

const User = mongoose.model("User",UserSchema)
module.exports = User