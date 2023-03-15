"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PropertySchema = new mongoose_1.Schema({
    uploadedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true
});
function populateUser(next) {
    //@ts-ignore
    this.populate("uploadedBy");
    //@ts-ignore
    next();
}
PropertySchema.pre("find", populateUser)
    .pre("findOne", populateUser)
    .pre("findOneAndUpdate", populateUser);
exports.Property = mongoose_1.default.model("Property", PropertySchema);
