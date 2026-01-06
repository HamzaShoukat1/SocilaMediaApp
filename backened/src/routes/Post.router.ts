import { verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost, getUsersPosts,getFeedPosts,likePost } from "../controllers/Post.controller.js";


const router = Router()
//Home feed + createPost
router.route("/").get(verifyToken,getFeedPosts).post(
    verifyToken,
    upload.single("picturePath"),
    createPost)


//User POST
router.get("/:userId/posts",verifyToken,getUsersPosts)

//like unlike
router.patch("/:id/like",verifyToken,likePost)

export default router