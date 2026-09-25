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

router.get("/:postId/edit",async(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    try{

        const post = await Post.findById(req.params.postId)

        if (!post){
            return res.send("Post not found.")
        }

        if (post.photographer.toString() !== req.session.user._id.toString()){
            return res.send("You can only edit your own Posts.")
        }

        res.render("posts/edit.ejs",{
            post:post
        })

    }catch(error){
        console.log(error)
        res.send("Could not load post.")
    }
})


router.put("/:postId",async(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    try{

        const post = await Post.findById(req.params.postId)

        if(!post){
            return res.send("Post not found.")
        }

        if(post.photographer.toString() !== req.session.user._id.toString()){
            return res.send("You can only edit your own posts.")
        }

        await Post.findByIdAndUpdate(
            req.params.postId,
            {
                image: req.body.image,
                caption: req.body.caption
            }
        )
        res.redirect("/profile")

    }catch(error){
        console.log(error)
        res.send("Could not update post.")
    }
})



router.delete("/:postId",async(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    try{

        const post = await Post.findById(req.params.postId)

        if(!post){
            return res.send("Post not found.")
        }

        if(post.photographer.toString() !== req.session.user._id.toString()){
            return res.send("You can only delete your own posts.")
        }

        await Post.findByIdAndDelete(req.params.postId)

        res.redirect("/profile")

    }catch(error){
        console.log(error)
        res.send("Could not delete post.")
    }
})

module.exports = router