import { User } from "../models/User.model.js";
import { Apierror } from "../utils/ApiError.js";
import { asynchandler } from "../utils/AsyncHandler.js";
import type { IBaseAuthDoc, TokenPayload } from "../Types/types.js";
import jwt from "jsonwebtoken"
import { FoodPartner } from "../models/FoodPartner.model.js";
import { Model } from "mongoose";


export const verifyToken = asynchandler(async (req, _res, next) => {
    try {
        //get token
        //verify token
        //extract user //remvoe password or rtoken
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new Apierror(401, "Unauthorized request,plz login first")

        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '') as TokenPayload

        const Model:Model<IBaseAuthDoc> =  decodedToken.role === "USER" ? User : FoodPartner

        const user = await Model.findById(decodedToken?._id).select("-password -refreshToken")//this _id comes from db 

        if (!user) {
            throw new Apierror(401, "Invalid access Token,login first")

        };
        req.user = user;
        req.userRole = decodedToken.role
        next()


    } catch (error) {
        throw new Apierror(401, "Invalid access token")

    }

})