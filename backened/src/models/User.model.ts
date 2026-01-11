import mongoose, { Schema } from "mongoose";
import { type IUser } from "../Types/types.js";
import bcrypt from "bcryptjs";
const UserSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
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


export const User = mongoose.model<IUser>("User", UserSchema)
