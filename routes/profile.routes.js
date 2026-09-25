const express = require("express")
const router = express.Router()


const User = require("../models/User.js")
const Post = require("../models/Post.js")


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

        const posts = await Post.find({
            photographer: req.session.user._id
        })

        res.render("profile/edit.ejs", {
            profileUser: user,
            posts:posts
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

        const posts = await Post.find({
            photographer:req.params.userId
        })

        res.render("profile/photographer.ejs",{
            photographer:photographer,
            posts:posts
        })

    }catch(error){
        console.log(error)
        res.send("Could not load photographer profile.")
    }
})


module.exports = router