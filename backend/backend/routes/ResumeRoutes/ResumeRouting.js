import express from "express"
import ResumeController from "../../Controllers/ResumeControllers/ResumeController.js";

const router=express.Router();

router.post("/addresume",ResumeController.AddResume)

router.post("/getresume",ResumeController.GetResume)

export default router;