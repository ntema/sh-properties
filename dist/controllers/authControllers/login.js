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
exports.login = void 0;
const models_1 = require("../../models");
const validators_1 = require("../../validators");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = validators_1.loginValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: { message: error.details[0].message }
            });
        }
        console.log("here-3");
        const user = yield models_1.User.findOne({ username: value.username }).select("+password");
        if (!user) {
            return res.status(400).json({
                error: {
                    status: "fail",
                    message: "Invalid username/password combination"
                }
            });
        }
        if (!user.isActivated) {
            return res.status(400).json({
                error: { message: "Your Account is not yet verified by management" }
            });
        }
        const isPassword = yield bcrypt_1.default.compare(value.password, user.password);
        if (!isPassword) {
            return res.status(400).json({
                error: {
                    status: "fail",
                    message: "Invalid username/password combination"
                }
            });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, config_1.constants.USER_TOKEN_SECRET, {
            expiresIn: config_1.constants.TOKEN_EXPIRATION_TIME
        });
        const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, config_1.constants.REFRESH_TOKEN_SECRET, { expiresIn: "14d" });
        return res.status(200).json({
            ststus: "success",
            data: { token, type: "bearer", refreshToken, user }
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.login = login;
