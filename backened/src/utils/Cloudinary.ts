import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME!,
  api_key:process.env.CLOUDINARY_API_KEY!,
  api_secret:process.env.CLOUDINARY_API_SECRET!,
});

const uploadCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      folder: "socialmediaapp", // optional folder in Cloudinary
    });

    // Remove file from local storage
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

    console.log("Cloudinary upload success:", response.url);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

    return null;
  }
};

export { uploadCloudinary };
