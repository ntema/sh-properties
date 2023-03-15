import { NextFunction, Response, Request } from "express";
import { Property } from "../../models";
import { addPropertyValidator } from "../../validators";
import slugify from "slugify";
import { uploads } from "../../utils";

export const addNewProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const { error, value } = addPropertyValidator.validate(req.body);
    console.log(value);

    if (error) {
      console.log("here-2");
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }
    let imagesURLs = [];
    let imagesMedia = [];

    const files: any = req.files;
    console.log(files);
    if (files && files.length > 0) {
      for (let file of files) {
        const media = await uploads(file);
        console.log(imagesURLs);
        imagesURLs.push(media.imageURL);
        imagesMedia.push(media);
      }
    } else {
      return res.status(401).json({
        error: { message: "At least one image must be uploaded" }
      });
    }
    value.imagesMedia = imagesMedia;
    value.imagesURLs = imagesURLs;

    value.name =
      value.name[0].toUpperCase() + value.name.substr(1).toLowerCase();

    let count = 0;
    let slug = slugify(value.name, { lower: true });
    value.nameSlug = slug;
    // value.location = JSON.parse(value.location);
    while (true) {
      const isProperty = await Property.findOne({ nameSlug: value.nameSlug });
      if (!isProperty) break;
      count++;
      value.nameSlug = slug + "-" + count;
    }
    if (value.amenities) {
      if (value?.amenities.type == "string") {
        value.amenities = [value.amenities];
      } else {
        value.amenities = Array.from(new Set(value.amenities));
      }
    }

    console.log(value);

    //@ts-ignore
    value.uploadedBy = req.user._id;
    value.location = {
      state: value.state,
      LGA: value.LGA,
      city: value.city,
      address: value.address
    };

    const property = await Property.create(value);
    return res.status(200).json({
      status: "success",
      data: property
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
