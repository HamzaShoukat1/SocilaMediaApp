import jwt from "jsonwebtoken"
import type { TokenPayload } from "../Types/types.js"



export const generateAccessToken = function(payload:TokenPayload){
    return jwt.sign(
     payload,
        process.env.ACCESS_TOKEN_SECRET || '',

        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY || ''
        } as jwt.SignOptions
    )
}
export const generateRefreshToken = function(payload:TokenPayload){
    return jwt.sign(
      payload,
        process.env.REFRESH_TOKEN_SECRET || '',

        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY || ''
        } as jwt.SignOptions
    )
}