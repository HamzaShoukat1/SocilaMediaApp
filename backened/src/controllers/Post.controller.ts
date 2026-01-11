import { asynchandler } from "../utils/AsyncHandler.js";
import { Apierror } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/Apiresponse.js";


// const createPost = asynchandler(async (req, res) => {

//     const userId = req.user?._id.toString() //use tokens instead of body

//     const { description, picturePath } = req.body
//     if (!description && !picturePath) {
//         throw new Apierror(400, "Post must have text or image");
//     }

//     const user = await User.findById(userId)
//     if (!user) {
//         throw new Apierror(400, "user not found")

//     }
//     const newPost = new Post({
//         userId,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         location: user.location,
//         description,
//         userPicturePath: user.picturePath,
//         picturePath,
//         likes: {},
//         comments: []
//     })
//     await newPost.save()
//     return res.status(201).json(
//         new Apiresponse(201, newPost, "Post created Successfully")
//     )

// })
// const getFeedPosts = asynchandler(async (_req, res) => {
//     const post = await Post.find().lean()

//     return res.status(200).json(
//         new Apiresponse(200, post, "Posts fetched successfully"))

// })
// const getUsersPosts = asynchandler(async (req, res) => {
//     const { userId } = req.params
//     if (!userId) {
//         throw new Apierror(400, "User ID is required");
//     }

//     const post = await Post.find({ userId }).sort({ createdAt: -1 }).lean()
//     if (post.length === 0) {
//         throw new Apierror(400, "User has no posts")
//     }
//     return res.status(200).json(
//         new Apiresponse(200, post, "Users post fetched Successfully")
//     )


// })
// const likePost = asynchandler(async (req,res) => {
//     const {id} = req.params //target
//   const userId = req.user?._id.toString();//actor

//   //validation
//   if(!id || !userId){
//         throw new Apierror(400, "Invalid post ID or Userid");
//   }
//     const post = await Post.findById(id)
//       if (!post) {
//     throw new Apierror(404, "Post not found");
//   }

//     if(post.likes.has(userId)){
//             post.likes.delete(userId); // Unlike

//     }else{
//         post.likes.set(userId,true)

//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//         id,
//         {likes: post?.likes},
//         {new:true}
//     )
//        return res.status(200).json(
//         new Apiresponse(200, updatedPost, "Users post fetched Successfully")
//     )



// })
// export {
//     createPost,
//     getFeedPosts,
//     likePost,
//     getUsersPosts,
// }