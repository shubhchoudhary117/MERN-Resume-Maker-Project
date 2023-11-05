import express from "express"
import AuthControllers from "../../Controllers/AutheticatinController/AuthController.js"


var router=express.Router()

router.get("/test",(req,res)=>{
    res.send("this is tested route")
})

router.post("/signup",AuthControllers.SignupUser)

router.post("/login",AuthControllers.LoginUser)

export default router;