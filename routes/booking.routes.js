const express = require("express")
const router = express.Router()

const Booking = require("../models/Booking.js")
const user = require("../models/User.js")
const User = require("../models/User.js")


router.get("/new/:photographerId",async(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    if(req.session.user.role !== "user"){
        return res.send("Only users can make bookings.")
    }

    try{

        const photographer = await User.findById(req.params.photographerId)

        if(!photographer){
            return res.send("Photographer not found.")
        }

        res.render("bookings/new.ejs",{
            photographer:photographer
        })

    }catch(error){
        console.log(error)
        res.send("Could not load booking form.")
    }

})




router.post("/",async(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    if(req.session.user.role !== "user"){
        return res.send("Only users can make bookings.")
    }

    try{

        await Booking.create({
            user: req.session.user._id,
            photographer: req.body.photographer,
            date: req.body.date,
            message: req.body.message
        })
        res.redirect("/profile")


    }catch(error){

        console.log(error)
        res.send("Could not create booking.")
    }
})

module.exports = router