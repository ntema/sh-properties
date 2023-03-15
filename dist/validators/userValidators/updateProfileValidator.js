"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const Schema = joi_1.default.object({
    firstName: joi_1.default.string().optional(),
    lastName: joi_1.default.string().optional(),
    phone: joi_1.default.number().optional(),
    address: joi_1.default.string().optional(),
    city: joi_1.default.string().optional(),
    LGA: joi_1.default.string().optional(),
    state: joi_1.default.string().optional(),
    country: joi_1.default.string().optional(),
    about: joi_1.default.string().optional(),
    socialAccounts: joi_1.default.object().optional()
});
exports.updateProfileValidator = Schema;
