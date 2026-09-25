const express = require("express")
const router = express.Router()


const Post = require("../models/Post.js")

router.get("/new",(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    if(req.session.user.role !== "photographer"){
        return res.send("Only photographers can create posts.")
    }

    res.render("posts/new.ejs")
})


router.post("/",async(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    if(req.session.user.role !== "photographer"){
        return res.send("Only photographers can create posts.")
    }

    try{
        await Post.create({
            photographer: req.session.user._id,
            image: req.body.image,
            caption: req.body.caption
        })

        res.redirect("/profile")
    
    }catch (error){
        console.log(error)
        res.send("Could not create post.")
    }


})

module.exports = router