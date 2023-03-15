import mongoose, { Schema } from "mongoose";

const AgentVerificationSchema = new Schema(
  {
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    imagesURLs: {
      type: [String]
    },
    validIdMedia: {
      type: Object,
      select: false
    },
    validIdURL: {
      type: Object,
      select: false
    },
    selfiePhotoMedia: {
      type: Object,
      select: false
    },
    selfiePhotoURL: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
export const AgentVerification = mongoose.model(
  "AgentVerification",
  AgentVerificationSchema
);
