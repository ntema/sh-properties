import cloudinary from "cloudinary";
import { constants } from "./constants";
cloudinary.v2.config({
  cloud_name: constants.CLOUDINARY_NAME,
  api_key: constants.CLOUDINARY_KEY,
  api_secret: constants.CLOUDINARY_SECRET
});

export const cloudinaryConfig = async (file: any) => {
  const config = {};

  const response = await cloudinary.v2.uploader.upload(file, config);
  return response;
};
