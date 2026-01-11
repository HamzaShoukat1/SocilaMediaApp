// import { asynchandler } from "../utils/AsyncHandler.js";
// import { Apierror } from "../utils/ApiError.js";
// import { Apiresponse } from "../utils/Apiresponse.js"
// import { User } from "../models/User.model.js";
// import mongoose from "mongoose";


// const getUser = asynchandler(async (req, res) => {
//     const { id } = req.params
//     if (!id) {
//         throw new Apierror(400, "User ID is required");

//     }
//     const user = await User.findById(id)
//     if (!user) {
//         throw new Apierror(404, "User not found");
//     }

//     return res.status(200).json(
//         new Apiresponse(200, user, "User fetched successfully")
//     );
// })
// const getUserFriends = asynchandler(async (req, res) => {

//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id!)) {
//         throw new Apierror(400, "Invalid user id");
//     }
//     const user = await User.findById(id)
//         .populate("friends", "firstName lastName location occupation picturePath");
//     if (!user) {
//         throw new Apierror(404, "user not found");
//     };
//     return res.status(200).json(
//         new Apiresponse(200, user.friends, "Friends fetched successfully"))

// })

// const addRemoveFrined = asynchandler(async (req, res) => {

//     const { id, friendId } = req.params
//     if (
//         !mongoose.Types.ObjectId.isValid(id || '') ||
//         !mongoose.Types.ObjectId.isValid(friendId || '')
//     ) {
//         throw new Apierror(400, "Invalid user ID");

//     };

//     //fetch users
//     const user = await User.findById(id)
//     const friend = await User.findById(friendId)

//     if (!user || !friend) {
//         throw new Apierror(404, "User or Friend not found");
//     }

//     //check friendShip
//     const isFriend = user.friends.some((obj) => obj.toString() === friendId)
//     if (isFriend) {
//         //removes friend from user’s list
//         user.friends = user.friends.filter((obj) => obj.toString() !== friendId)
//       //emoves user from friend’s list
//         friend.friends = friend.friends.filter(
//             (userObjectId) => userObjectId.toString() !== id
//         );
//     } else{
//         user.friends.push(friend._id || '')
//         friend.friends.push(user._id || '')
//     }
//     await user.save();
//     await friend.save()

//   // 5️⃣ Return updated friend list
//   const updatedUser = await User.findById(id).populate(
//     "friends",
//     "firstName lastName location occupation picturePath"
//   );
//   return res.status(200).json(
//     new Apiresponse(
//       200,
//       updatedUser?.friends,
//       isFriend ? "Friend removed" : "Friend Added"
//     )
//   );

// })

// export {
//     getUser,
//     getUserFriends,
//     addRemoveFrined


// }