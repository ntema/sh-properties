import mongoose, { Schema } from "mongoose";
import { DateTime } from "luxon";

const SubscriptionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    startDate: {
      type: Date,
      default: DateTime.now()
    },
    endDate: {
      type: Date,
      default: DateTime.now().plus({ months: 1 })
    },
    features: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);
export const Subscription = mongoose.model("Subscription", SubscriptionSchema);
