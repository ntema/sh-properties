import { cloudinaryConfig } from "../config";
import DatauriParser from "datauri/parser";
import { extname } from "path";
const parser = new DatauriParser();

export const uploads = async function uploads(body: any) {
  const buffer = body.buffer;
  // console.log(buffer)
  const ext = extname(body.originalname);
  const uri = parser.format(ext, buffer);

  const result = await cloudinaryConfig(uri.content);
  const media = {
    asset_id: result.asset_id,
    public_id: result.public_id,
    type: result.resource_type,
    imageURL: result.secure_url,
    size: result.bytes
  };

  return media;
};
