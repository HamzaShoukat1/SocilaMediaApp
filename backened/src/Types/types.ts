import type {JwtPayload} from "jsonwebtoken"
import mongoose, {  Document } from "mongoose";

// export type Multerfile = {
//     picturePath: Express.Multer.File[],
// }

export interface AccessTokenPayload extends JwtPayload {
    _id:string

}

//users for register
export interface IUser extends Document {
    firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath?: string;
  friends: mongoose.Types.ObjectId[]; // usually user IDs
  location?: string;
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
  refreshToken:string;
  isPasswordCorrect(password:string): Promise<boolean>
  generateAccessToken():string
  generateRefreshToken():string

}
export interface IPOST extends Document {
  userId:string
    firstName: string;
  lastName: string;
  picturePath?: string
  userPicturePath:string,
  description:string
  location?: string;
  likes: Map<string,boolean>
  comments?:Array<[]>


}
