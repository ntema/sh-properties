import mongoose, { Schema } from "mongoose";

const CompanyCACCertSchema = new Schema(
  {
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    media: {
      type: Object,
      select: false
    },
    imageURL: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
export const CompanyCACCert = mongoose.model(
  "CompanyCACCert",
  CompanyCACCertSchema
);
