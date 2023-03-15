import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const PropertySchema = new Schema(
  {
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: "62d77b4b251bc07f567efa10"
    },
    name: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "available",
      enum: ["available", "unavialable"]
    },
    type: {
      type: String,
      default: "sell",
      enum: ["Rent", "Buy"]
    },

    buildingType: {
      type: String
    },

    subCategory: {
      type: String
    },
    price: {
      type: Number
    },
    duration: {
      type: String
    },
    leaseDuration: {
      type: String
    },
    LGA: {
      type: String
    },
    bedRooms: {
      type: String
    },
    bathRooms: {
      type: Number,
      default: 0
    },

    location: {
      type: Object
    },

    description: {
      type: String,
      required: true
    },
    buildingAge: {
      type: String
    },
    garage: {
      type: String
    },
    nameSlug: {
      type: String
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    amenities: {
      type: Array
    },
    loan: {
      type: Number,
      default: 0,
      min: 0,
      max: 50
    },
    imaOriginal: {
      type: Boolean,
      default: false
    },
    featured: {
      type: Boolean,
      default: false
    },
    imagesURLs: {
      type: [String]
    },
    imagesMedia: {
      type: [Object],
      select: false
    }
  },
  {
    timestamps: true
  }
);

function populateUser(next: any) {
  //@ts-ignore
  this.populate("uploadedBy");
  //@ts-ignore
  next();
}

PropertySchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

export const Property = mongoose.model("Property", PropertySchema);
