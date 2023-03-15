"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const models_1 = require("../../models");
const validators_1 = require("../../validators");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = validators_1.registerValidator.validate(req.body);
        if (error) {
            console.log("here-2");
            return res.status(400).json({
                error: { message: error.details[0].message }
            });
        }
        const isUser = yield models_1.User.findOne({ email: value.email });
        if (isUser) {
            return res.status(400).json({
                error: { status: "fail", message: "Email already exists" }
            });
        }
        value.password = yield bcrypt_1.default.hash(value.password, 12);
        const user = yield models_1.User.create(value);
        const token = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, config_1.constants.USER_TOKEN_SECRET, {
            expiresIn: config_1.constants.TOKEN_EXPIRATION_TIME
        });
        const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.constants.REFRESH_TOKEN_SECRET, { expiresIn: "14d" });
        return res.status(200).json({
            status: "success",
            data: { token, type: "bearer", refreshToken, user }
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.register = register;
