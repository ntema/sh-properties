import mongoose, { Schema } from "mongoose";
import { DateTime } from "luxon";

const PackageSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    propertyLimit: {
      type: Number
    },
    interval: {
      type: String
    },
    amount: {
      type: String
    },
    features: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);

export const Package = mongoose.model("Package", PackageSchema);
