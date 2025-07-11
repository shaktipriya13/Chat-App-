
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

const uploadOnCloudinary = async (filePath) => {
    // in cloudinary we need a filePath which we need to upload
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    })
    try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(filePath);
        // uploadResult is a very big object, isme se we need url

        fs.unlinkSync(filePath);
        return uploadResult.secure_url;

    } catch (err) {
        fs.unlinkSync(filePath);
        console.log(err);
    }
}

export default uploadOnCloudinary;