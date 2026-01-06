import mongoose,{Schema}  from "mongoose";
import type  { IPOST } from "../Types/types.js";
const PostSchema = new  Schema<IPOST>(
    {
        userId: {
            type:String,
            required:true
        },
           firstName: {
            type:String,
            required:true
        },
             lastName: {
            type:String,
            required:true
        },
        location:String,
        description: String,
        picturePath:String,
        userPicturePath:String,
        likes: {
            type:Map,//Map is userId
            of:Boolean,
            default: {}
        },
        comments: {
            type:Array,
            default:[]
        }
                

    },
    {timestamps:true}
)

export const Post = mongoose.model<IPOST>("Post",PostSchema)