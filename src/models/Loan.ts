import mongoose, { Schema } from "mongoose";
import { DateTime } from "luxon";

const LoanSchema = new Schema(
  {
    appliedBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property"
    },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected", "completed"],
      default: "pending"
    },
    loanAmount: {
      type: Number
    },
    interestAmount: {
      type: Number
    },
    actionDate: {
      type: Date,
      default: DateTime.now()
    }
  },
  {
    timestamps: true
  }
);
export const Loan = mongoose.model("Loan", LoanSchema);
