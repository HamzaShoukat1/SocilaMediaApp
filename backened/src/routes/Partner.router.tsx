import { Router } from "express";
import { registerFoodPartner,loginFoodPartner,logoutFoodPartner, getFoodPartberByid, } from "../controllers/Auth.controllers.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

 const router = Router()


router.route("/register").post(registerFoodPartner)
router.route("/login").post(loginFoodPartner)
router.route("/login").post(
    verifyToken,
    logoutFoodPartner
)

router.get("/:id",
    verifyToken,
    getFoodPartberByid
)


export default router
