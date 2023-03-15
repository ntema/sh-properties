import mongoose, { Schema } from "mongoose";
import { DateTime } from "luxon";

const MessageSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property"
    },

    content: {
      type: String
    },
    delivered: {
      type: Boolean,
      default: false
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);
export const Message = mongoose.model("Message", MessageSchema);
