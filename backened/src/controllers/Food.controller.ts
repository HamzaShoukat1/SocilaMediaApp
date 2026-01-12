import { Apiresponse } from "../utils/Apiresponse.js";
import { Apierror } from "../utils/ApiError.js";
import { asynchandler } from "../utils/AsyncHandler.js";
import { v4 as uuid } from "uuid"
import { uploadCloudinary } from "../utils/Cloudinary.js";
import path from "path";
import { FoodModel } from "../models/Food.model.js";


const createFood = asynchandler(async (req, res) => {
    //check file
    if (!req.file || !req.file.buffer) {
        throw new Apierror(400, "Video File is required");
    }
    //destructure body
    const {name ,description} = req.body

    if(!name || !description){
            throw new Apierror(400, "Name and description are required");
    }
      // Prepare filename with extension
    const ext = path.extname(req.file.originalname);
    const fileName = `${uuid()}${ext}`

    //upload on cloudinary
    let fileUploadResult
    try {
            fileUploadResult = await uploadCloudinary(req.file.buffer, fileName);
        
    } catch (error) {
            throw new Apierror(500, "Failed to upload video");
        
    }
    //create food document

        const foodItem = await FoodModel.create({
            name:req.body.name,
            description:req.body.description,
            video:fileUploadResult,
            foodPartner:req.user?._id


        })


    return res.status(201).json(new Apiresponse(201, foodItem, "Food created successfully"))




});
const getFoodItems = asynchandler(async(_req,res)=> {
//     const page = parseInt(req.query.page as string) || 1;
// const limit = parseInt(req.query.limit as string) || 20;
// const skip = (page - 1) * limit;

    const foodItems = await FoodModel.find({}).sort({createddAt: -1})
    // .skip(skip)
    // .limit(limit)
    // .populate("foodPartner","name email")

    return res.status(200).json(
        new Apiresponse(200,foodItems,"Food items fetched Succeesfully")
    ) 


})


export {
    createFood,
    getFoodItems,
}