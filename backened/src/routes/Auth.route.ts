import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/Auth.controllers.js";
import { refreshAccessTokens } from "../controllers/Auth.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


const router = Router()

//auth apis
router.route("/register").post(
    // upload.single("picturePath"),
    registerUser)

router.route("/login").post(loginUser)
router.route("/logout").post(
    verifyToken,
    logoutUser)
router.route("/refresh-token").post(refreshAccessTokens)



//foodpartner auth apis

router

export default router

