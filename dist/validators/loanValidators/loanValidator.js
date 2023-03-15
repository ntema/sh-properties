"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const Schema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    dob: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    phone: joi_1.default.number().required(),
    address: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    bvn: joi_1.default.string().required().length(10),
    propertyId: joi_1.default.string().required(),
    loanAmount: joi_1.default.number().required(),
    interestAmount: joi_1.default.number().required()
});
exports.loanValidator = Schema;
