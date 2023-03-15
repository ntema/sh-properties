"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPropertyValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const Schema = joi_1.default.object({
    name: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    state: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    LGA: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    bathRooms: joi_1.default.number().required(),
    bedRooms: joi_1.default.string().required(),
    duration: joi_1.default.string().optional(),
    description: joi_1.default.string().required(),
    leaseDuration: joi_1.default.string().optional(),
    country: joi_1.default.string().required(),
    // buildingAge: Joi.string().required(),
    // buildingType: Joi.string().required(),
    subCategory: joi_1.default.string().required(),
    otherFaetures: joi_1.default.array().optional(),
    loan: joi_1.default.number().optional(),
    imaOriginal: joi_1.default.boolean().optional(),
    amenities: joi_1.default.alternatives([joi_1.default.string(), joi_1.default.array()]).optional()
});
exports.addPropertyValidator = Schema;
