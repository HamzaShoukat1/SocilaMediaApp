import { Router } from "express";
import { createFood } from "../controllers/Food.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { onlyFoodPartner } from "../middlewares/onlyFoodpartnermiddleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getFoodItems } from "../controllers/Food.controller.js";


const router = Router()

router.route("/upload").post(
    verifyToken,
    onlyFoodPartner,
    upload.single("video"),
    createFood
)
//items in home screen
router.route("/").get(
    verifyToken,
    getFoodItems
)

export default router