import type {JwtPayload} from "jsonwebtoken"
import  {  Document, Types } from "mongoose";

export interface AccessTokenPayload extends JwtPayload {
    _id:string

}


//users for register
export interface IUser extends Document {
  fullName:string
  email: string;
  password: string;
  refreshToken:string;
  isPasswordCorrect(password:string): Promise<boolean>


};
export interface IFoodPartner extends Document {
  name:string
  email: string;
  password: string;
  phone:string
  address:string
  refreshToken:string;
  isPasswordCorrect(password:string): Promise<boolean>


};
export interface IFood extends Document {
  name:string,
  description:string,
  video:string,
  foodPartner:Types.ObjectId

}

export type TokenPayload  = {
    _id:string
    role: "USER" | "FOOD_PARTNER"
}
export interface IBaseAuthDoc extends Document {
  refreshToken?: string;
}


