import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser, registerUser } from "../controllers/Auth.controllers.js";

const router = Router()

router.route("/register").post(
    upload.single("picturePath"),
    registerUser)

//login
router.route("/login").post(loginUser)

export default router

