import { User } from "../models/User.model.js";
import { Apierror } from "../utils/ApiError.js";
import { asynchandler } from "../utils/AsyncHandler.js";
import type { AccessTokenPayload } from "../Types/types.js";
import jwt from "jsonwebtoken"
export const verifyToken = asynchandler(async (req,_res, next) => {
    try {
        //get token
        //verify token
        //extract user //remvoe password or rtoken
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new Apierror(401, "Unauthorized request")

        }
        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET || '') as AccessTokenPayload

    const user =  await User.findById(decodeToken?._id).select("-password -refreshToken") //this _id comes from db 
      
    if (!user) {
       throw new Apierror(401,"Invalid access Token")
       
    }
    req.user = user;
    next()


    } catch (error) {
    throw new Apierror(401, "Invalid access token")

    }

})