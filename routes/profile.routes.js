const express = require("express")
const router = express.Router()
const User = require("../models/User.js")


router.get("/", async (req, res) => {

    if (!req.session.user) {
        return res.redirect("/auth/sign-in")
    }

    try {
        const user = await User.findById(
            req.session.user._id
        )

        if (!user) {
            return res.send("User not found.")
        }

        res.render("profile/edit.ejs", {
            profileUser: user
        })
    }

    catch (error) {
        console.log(error)
        res.send("Could not load profile.")
    }
})


router.put("/", async (req, res) => {

    if (!req.session.user) {
        return res.redirect("/auth/sign-in")
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.session.user._id,
            {
                profilePic: req.body.profilePic,
                bio: req.body.bio,
                style: req.body.style
            }
        )

        res.redirect("/profile")




}catch (error) {

    console.log(error)
    res.send("Could not update profile.")
}
})


router.get("/:userId",async(req,res)=>{

    try{
        const photographer = await User.findById(req.params.userId)

        if(!photographer){
            return res.send("Photographer not found.")
        }
        res.render("profile/photographer.ejs",{
            photographer:photographer
        })

    }catch(error){
        console.log(error)
        res.send("Could not load photographer profile.")
    }
})


module.exports = router