import { asynchandler } from "../utils/AsyncHandler.js";
import { Apierror } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { User } from "../models/User.model.js";
import { uploadCloudinary } from "../utils/Cloudinary.js";
// import { AccessTokenPayload } from "../Types/types.js";
import fs from "fs"

const generateAcessandRefreshTokens = async (userId: string) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new Apierror(404, "User not found");
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        //store refrehs token in db
        await user?.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }




    } catch (error) {
        throw new Apierror(500, "Something went wrong while generating access and refresh tokens")


    }


}
const registerUser = asynchandler(async (req, res) => {
    //get users details for fronted
    //validation..not empty
    //check user already exist,
    //check for images,check for avatar,
    // upload on cloudinary
    //create user object create entry in db,
    //remove password and refreshtoken from res
    //check for user creation
    //return res 
    const { email, firstName, lastName, password, location, occupation } = req.body
    if (
        [firstName, lastName, email, password, location, occupation].some((fields) => fields?.trim() === "")
    ) {
        throw new Apierror(400, "all fields are required")

    };

    const existedUser = await User.findOne({
        $or: [{ firstName }, { email }]
    })
    if (existedUser) {
        throw new Apierror(400, "user with email or username already existed")

    };
    //local multer path
    const file = req.file

    // const localpicturePath = files?.picturePath?.[0]?.path
    if (!file || !file.path) {
        throw new Apierror(400, "Picture is required")

    }
    // const localpicturePath = file.path
    console.log("FILE PATH:", file.path);
    console.log("FILE EXISTS:", fs.existsSync(file.path));

    //upload cloudnary
    const PicturePath = await uploadCloudinary(file.path)
    if (!PicturePath) {
        throw new Apierror(400, "upload on cloudinary is failed ")

    }
    console.log("Local file path:", PicturePath)
    //createUser obj entry in db
    const user = await User.create({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        picturePath: PicturePath.url,
        email,
        password,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),



    })
    //remove password or refewshtoekn
    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    ).lean() //lean return plain js object instead of monoogse obj
    if (!createUser) {
        throw new Apierror(500, "Something wrong while register User")
    };
    return res.status(201).json(
        new Apiresponse(200, createUser, "User registered successfully")
    )


});
const loginUser = asynchandler(async (req, res) => {
    //get data fro fronted
    //find the user 
    //password check
    //access and refresh token
    //cookie

    const { email, password } = req.body
    if (!(email || password)) {
        throw new Apierror(400, "email or password is required")

    };
    const user = await User.findOne({
        $or: [{ email }]
    })
    if (!user) {
        throw new Apierror(400, "user does not exist")

    };

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new Apierror(401, "Invalid user credentials")

    };
    const { accessToken, refreshToken } = await generateAcessandRefreshTokens(user._id.toString())

    const logedInUser = await User.findById(user._id).select("-password -refreshToken")

    const option = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)


        .json(
            new Apiresponse(
                200,
                {
                    user: logedInUser, accessToken, refreshToken
                },
                "user logged In Successfully"
            )
        )



})
export {
    registerUser,
    loginUser,
}