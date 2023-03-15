import { Schema } from "mongoose";

const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    name: {
      type: String
    },
    city: {
      type: String
    },
    LGA: {
      type: String
    },
    title: {
      type: String
    },
    phone: {
      type: String
    },
    dob: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male"
    },
    address: {
      type: String
    },
    country: {
      type: String
    },
    state: {
      type: String
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    username: {
      type: String
    },
    referrals: {
      type: [Schema.Types.ObjectId],
      ref: "User"
    },
    about: {
      type: String
    },
    bvn: {
      type: String
    },
    isActivated: {
      type: Boolean,
      default: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isAgent: {
      type: Boolean,
      default: false
    },
    isCompany: {
      type: Boolean,
      default: false
    },
    socialAccounts: {
      type: Object,
      default: {}
    },

    role: {
      type: String,
      enum: ["company", "agent", "user", "admin"],
      default: "user"
    },
    validIdMedia: {
      type: Object,
      select: false
    },
    validIdURL: {
      type: String
    },
    avatarMedia: {
      type: Object,
      select: false
    },
    avatarURL: {
      type: String
    },
    wallet: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);
export const User = mongoose.model("User", UserSchema);
