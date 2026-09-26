const express = require("express")
const router = express.Router()

const Booking = require("../models/Booking.js")
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



router.get("/requests",async(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    if(req.session.user.role !== "photographer"){
        return res.send("Only photographers can view booking requests.")
    }

    try{

        const bookings = await Booking.find({
            photographer: req.session.user._id}).populate("user")

        res.render("bookings/requests.ejs",{
            bookings:bookings
        })

    }catch(error){
        console.log(error)
        res.send("Could not load booking requests.")
    }

})


router.put("/:bookingId/accept",async(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    if(req.session.user.role !== "photographer"){
        return res.send("Only photographers can accept bookings.")
    }

    try{

        const booking = await Booking.findById(req.params.bookingId)

        if(!booking){
            return res.send("Booking not found.")
        }

        if(
            booking.photographer.toString() !== req.session.user._id.toString()){
                return res.send("You can only manage your own bookings.")
            }

        await Booking.findByIdAndUpdate(
            req.params.bookingId,
            {
                status: "Accepted"
            }
        )

        res.redirect("/bookings/requests")
        

    }catch(error){
        console.log(error)
        res.send("Could not accept booking.")
    }

})




router.put("/:bookingId/reject",async(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    if(req.session.user.role !== "photographer"){
        return res.send("Only photographers can reject bookings.")
    }

    try{

        const booking = await Booking.findById(req.params.bookingId)

        if(!booking){
            return res.send("Booking not found.")
        }

        if(
            booking.photographer.toString() !== req.session.user._id.toString()){
                return res.send("You can only manage your own bookings.")
            }

        await Booking.findByIdAndUpdate(
            req.params.bookingId,
            {
                status: "Rejected"
            }
        )

        res.redirect("/bookings/requests")
        

    }catch(error){
        console.log(error)
        res.send("Could not reject booking.")
    }

})
module.exports = router