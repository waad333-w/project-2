const router = require("express").Router()
const User = require("../models/User.js")


router.get('/',(req,res)=>{
    res.render('homepage.ejs')
})

router.get("/photographers",async(req,res)=>{
    try{
        const photographers = await User.find({
            role: "photographer"
        })

        res.render("photographers/index.ejs",{
            photographers:photographers
        })

    }catch(error){
        console.log(error)
        res.send("Could not load photographers.")
    }
})


module.exports = router;
