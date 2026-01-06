import { verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {getUser,getUserFriends,addRemoveFrined} from "../controllers/User.controllers.js"

const router = Router()
//read
router.get("/:id",verifyToken,getUser)
router.get("/:id/friends",verifyToken,getUserFriends)

//update
router.patch("/:id/friends/:friendId",verifyToken,addRemoveFrined)

export default router