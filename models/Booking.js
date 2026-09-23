const mongoose = require("mongoose")
const BookingSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    photographer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    date:{
        type:Date,
        required:true
    },

    message:{
        type:String,
        default:""
    },

    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }

},{timestamps:true})

const Booking = mongoose.model("Booking",BookingSchema)
module.exports = Booking