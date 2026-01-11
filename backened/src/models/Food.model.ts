import mongoose, { Schema } from "mongoose";
import { type IFood } from "../Types/types.js";
const FoodSchema = new Schema<IFood>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        video: {
            type: String,
            required: true,
        },
        description: {
            type: String,

        },
        foodPartner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodPartner"
        },


    },
    { timestamps: true }
)



export const FoodModel = mongoose.model<IFood>("FoodModel", FoodSchema)
