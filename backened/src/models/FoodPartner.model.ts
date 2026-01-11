import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import type { IFoodPartner } from "../Types/types.js";

const FoodPartnerSchema = new Schema<IFoodPartner>(

    {

        name: {
            type: String,
            required: true,
            unique: true,
            trim: true


        },
        phone: {
              type: String,
            required: true,
        },
        address: {
                 type: String,
            required: true,
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

        },
    },
    { timestamps: true }
)

FoodPartnerSchema.pre("save", async function (): Promise<void> {
    if (!this.isModified("password")) return //“Only hash password if it was changed”
    this.password = await bcrypt.hash(this.password, 10)
});
FoodPartnerSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)

}


export const FoodPartner = mongoose.model<IFoodPartner>("FoodPartner", FoodPartnerSchema)