const express = require("express")
const router = express.Router()


const Post = require("../models/Post.js")
const upload = require("../middleware/upload.js")


router.get("/",async(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    if(req.session.user.role !== "photographer"){
        return res.send("Only photographers can view their portfolio.")
    }


    try{
        const posts = await Post.find({
            photographer: req.session.user._id
        })

        res.render("posts/index.ejs",{
            posts:posts 
        })

    }catch(error){
        console.log(error)
        res.send("Could not load portfolio")
    }
})



router.get("/new",(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    if(req.session.user.role !== "photographer"){
        return res.send("Only photographers can create posts.")
    }

    res.render("posts/new.ejs")
})


router.post("/", upload.single("image"),async(req,res)=>{

    if(!req.session.user){
        return res.redirect("/auth/sign-in")
    }

    if(req.session.user.role !== "photographer"){
        return res.send("Only photographers can create posts.")
    }

    try{
        await Post.create({
            photographer: req.session.user._id,
            image: "/uploads/" + req.file.filename,
            caption: req.body.caption
        })

        res.redirect("/posts")
    
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


router.put("/:postId",upload.single("image"),async(req,res)=>{

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

        const updateData ={
            caption: req.body.caption
        }

        if(req.file){
            updateData.image = "/uploads" + req.file.filename
        }

        await Post.findByIdAndUpdate(
            req.params.postId,
            updateData
        )

        res.redirect("/posts")

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

        res.redirect("/posts")

    }catch(error){
        console.log(error)
        res.send("Could not delete post.")
    }
})

module.exports = router