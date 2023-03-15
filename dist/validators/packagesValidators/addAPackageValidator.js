"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAPackageValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const Schema = joi_1.default.object({
    name: joi_1.default.string().required(),
    amount: joi_1.default.string().required(),
    interval: joi_1.default.string().required(),
    propertyLimit: joi_1.default.string().optional(),
    features: joi_1.default.array().required()
});
exports.addAPackageValidator = Schema;
