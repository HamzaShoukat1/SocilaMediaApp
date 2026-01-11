import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const uploadCloudinary = async (fileBuffer: Buffer, fileName: string) => {
    try {
        const result = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "video", folder: "socialmediaapp", public_id: fileName },
                (error, response) => {
                    if (error) return reject(error); // reject on error
                    resolve(response); // resolve on success
                }
            );

            streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });

        return result.url // return the Cloudinary response
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error; // throw so controller can catch it
    }
};

export { uploadCloudinary };
