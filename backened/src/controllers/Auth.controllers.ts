import { asynchandler } from "../utils/AsyncHandler.js";
import { Apierror } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken"
import { FoodPartner } from "../models/FoodPartner.model.js";
import { generateAccessToken,generateRefreshToken } from "../services/Token.services.js";

const generateAcessandRefreshTokens = async (userId: string,role: "USER" | "FOOD_PARTNER") => {
    const Model = role === "USER" ? User : FoodPartner
    try {
        const user = await Model.findById(userId)
        if (!user) {
            throw new Apierror(404, "User not found");
        }
        const accessToken = generateAccessToken({
            _id:user._id.toString(),
            role
        })
        const refreshToken = generateRefreshToken({
                _id: user._id.toString(),
                role
        })

        user.refreshToken = refreshToken
        //store refrehs token in db
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }




    } catch (error) {
        throw new Apierror(500, "Something went wrong while generating access and refresh tokens")


    }


};
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
    const { email, fullName, password } = req.body
    if (
        [fullName, email, password].some((fields) => fields?.trim() === "")
    ) {
        throw new Apierror(400, "all fields are required")

    };

    const existedUser = await User.findOne({
        $or: [{ email }]
    })
    if (existedUser) {
        throw new Apierror(400, "user with email or username already existed")

    };
    // //local multer path
    // const file = req.file

    // // const localpicturePath = files?.picturePath?.[0]?.path
    // if (!file || !file.path) {
    //     throw new Apierror(400, "Picture is required")

    // }


    // //upload cloudnary
    // const PicturePath = await uploadCloudinary(file.path)
    // if (!PicturePath) {
    //     throw new Apierror(400, "upload on cloudinary is failed ")

    // }
    //createUser obj entry in db
    const user = await User.create({
        fullName: fullName,
        email,
        password,



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
    const { accessToken, refreshToken } = await generateAcessandRefreshTokens(user._id.toString(),"USER")

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



});
const logoutUser = asynchandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        http: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new Apiresponse(200, {}, "User logout out"))


});

const registerFoodPartner = asynchandler(async (req, res) => {
    //get users details for fronted
    //validation..not empty
    //check user already exist,
    //check for images,check for avatar,
    // upload on cloudinary
    //create user object create entry in db,
    //remove password and refreshtoken from res
    //check for user creation
    //return res 
    const { email, fullName, password } = req.body
    if (
        [fullName, email, password].some((fields) => fields?.trim() === "")
    ) {
        throw new Apierror(400, "all fields are required")

    };

    const existedUser = await FoodPartner.findOne({
        $or: [{ email }]
    })
    if (existedUser) {
        throw new Apierror(400, "Food Partner with email or username already existed")

    };
  
    //createUser obj entry in db
    const user = await FoodPartner.create({
        fullName: fullName,
        email,
        password,



    })
    //remove password or refewshtoekn
    const createUser = await FoodPartner.findById(user._id).select(
        "-password -refreshToken"
    ).lean() //lean return plain js object instead of monoogse obj
    if (!createUser) {
        throw new Apierror(500, "Something wrong while register FoodPartner")
    };
    return res.status(201).json(
        new Apiresponse(200, createUser, "FoodPartner registered successfully")
    )


});
const loginFoodPartner = asynchandler(async (req, res) => {
    //get data fro fronted
    //find the user 
    //password check
    //access and refresh token
    //cookie

    const { email, password } = req.body
    if (!(email || password)) {
        throw new Apierror(400, "email or password is required")

    };
    const user = await FoodPartner.findOne({
        $or: [{ email }]
    })
    if (!user) {
        throw new Apierror(400, "Food Partner does not exist")

    };

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new Apierror(401, "Invalid Food Partner credentials")

    };
    const { accessToken, refreshToken } = await generateAcessandRefreshTokens(user._id.toString(),"FOOD_PARTNER")

    const logedInUser = await FoodPartner.findById(user._id).select("-password -refreshToken")

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
                "Food Partner logged In Successfully"
            )
        )



});

const refreshAccessTokens = asynchandler(async (req, res) => {
    //acccess tokens
    const incomingRefreshTokenfromdb = req.cookies.refreshToken || req.body.refreshToken //body for mobile

    if (!incomingRefreshTokenfromdb) {
        throw new Apierror(401, "Unauthorized request")

    }
    //now verify tokens 
    try {
        const decodedToken = jwt.verify(
            incomingRefreshTokenfromdb,
            process.env.REFRESH_TOKEN_SECRET || ''
        ) as {_id:string; role:"USER" | "FOOD_PARTNER"}
        //find user who have token
        const Model = decodedToken.role === "USER" ? User : FoodPartner
        const user = await Model.findById(decodedToken?._id)

        if (!user) {
            throw new Apierror(401, "Invalid refresh token")

        };
        if (incomingRefreshTokenfromdb !== user?.refreshToken) {
            throw new Apierror(401, "Refresh tokken is expired or used")
        };

        const options = {
            httpOnly: true,
            secure: true
        }

        //generate new tokens
        const { accessToken, refreshToken }: any = await generateAcessandRefreshTokens(user._id.toString(),decodedToken.role)
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new Apiresponse(
                    200,
                    {
                        accessToken, refreshToken
                    },
                    "Aceess token refreshed"
                )
            )

    } catch (error) {
        throw new Apierror(401, "Invalid refresh token")

    }





});
const logoutFoodPartner = asynchandler(async (req, res) => {
    await FoodPartner.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new Apiresponse(200, {}, "Food Partner logged out successfully"
))


});

export {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    refreshAccessTokens,
    logoutFoodPartner,
}