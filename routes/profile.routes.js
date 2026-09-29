const express = require("express")
const router = express.Router()


const User = require("../models/User.js")
const Post = require("../models/Post.js")
const upload = require("../middleware/upload.js")

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

        res.render("profile/index.ejs", {
            profileUser: user
        })
    }

    catch (error) {
        console.log(error)
        res.send("Could not load profile.")
    }
})

router.get("/edit",async(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    try{

        const user = await User.findById(
            req.session.user._id
        )

        if(!user){
            return res.send("User not found.")
        }

        res.render("profile/edit.ejs",{
            profileUser:user
        })

    }catch (error){

        console.log(error)
        res.send("Could not load edit profile.")
    }
})


router.put("/",upload.single("profilePic"), async (req, res) => {

    if (!req.session.user) {
        return res.redirect("/auth/sign-in")
    }

    try {
        const updateData = {
             bio: req.body.bio,
            style: req.body.style
        }

        if(req.file){
            updateData.profilePic = "/uploads/" + req.file.filename
        }
            await User.findByIdAndUpdate(
            req.session.user._id,
            updateData
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