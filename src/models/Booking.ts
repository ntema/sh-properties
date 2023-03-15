import mongoose, { Schema } from "mongoose";
import { DateTime } from "luxon";

const BookingSchema = new Schema(
  {
    visitDate: {
      type: String
    },
    description: {
      type: String
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property"
    },
    bookee: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);
export const Booking = mongoose.model("Booking", BookingSchema);
