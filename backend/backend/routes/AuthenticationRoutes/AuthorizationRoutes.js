import express from "express"
import AuthorizationController from "../../Controllers/AutheticatinController/AuthorizationControllers.js"
const router=express.Router();

router.post("/authenticate",AuthorizationController.TokenVerify)

export default router;