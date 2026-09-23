const mongoose = require("mongoose")
const PostSchema = new mongoose.Schema({

    photographer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    image:{
        type:String,
        required:true
    },

    caption:{
        type:String,
        default:""
    }

},{timestamps:true})

const Post = mongoose.model("Post",PostSchema)
module.exports = Post