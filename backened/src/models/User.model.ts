import mongoose, { Schema } from "mongoose";
import { type IUser } from "../Types/types.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
const UserSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 20,
            unique: true,
            lowercase: true,
            trim: true


        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 20,
            unique: true,
            lowercase: true,
            trim: true


        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            unique: true

        },
        picturePath: {
            type: String,
            default: "",

        },
        friends: {
            type: [Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
        location: {
            type: String
        },
        occupation: {

            type: String
        },
viewedProfile: {
    type: Number, 
    default: Math.floor(Math.random() * 10000) 
},
impressions: {
    type: Number,
    default: Math.floor(Math.random() * 10000)
},

           refreshToken: {
        type: String,
    }

    },
    { timestamps: true }
)
UserSchema.pre("save",  async function():Promise<void>{
    if(!this.isModified("password")) return //“Only hash password if it was changed”
    this.password = await bcrypt.hash(this.password, 10)
});
UserSchema.methods.isPasswordCorrect = async function(password:string):Promise<boolean>{
    return await bcrypt.compare(password,this.password)

}
//generate acces token
UserSchema.methods.generateAccessToken = function():string{
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            firstName:this.firstName,
            lastName:this.lastName
        },
        process.env.ACCESS_TOKEN_SECRET || '',

        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY || ''
        } as jwt.SignOptions
    )
},
UserSchema.methods.generateRefreshToken = function():string{
    return jwt.sign(
        {
            _id:this._id,
          
        },
        process.env.REFRESH_TOKEN_SECRET || '',

        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY || ''
        } as jwt.SignOptions
    )
}


export const User = mongoose.model<IUser>("User", UserSchema)
