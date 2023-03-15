import mongoose, { Schema } from "mongoose";

const SavedPropertySchema = new Schema(
  {
    savedBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property"
    }
  },
  {
    timestamps: true
  }
);
export const SavedProperty = mongoose.model(
  "SavedProperty",
  SavedPropertySchema
);
