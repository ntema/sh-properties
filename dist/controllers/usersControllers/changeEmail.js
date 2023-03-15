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
exports.changeEmail = void 0;
const models_1 = require("../../models");
const validators_1 = require("../../validators");
const bcrypt_1 = __importDefault(require("bcrypt"));
const changeEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = validators_1.changeEmailValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: { message: error.details[0].message }
            });
        }
        //@ts-ignore
        let user = req.user;
        const isPassword = yield bcrypt_1.default.compare(value.password, user.password);
        if (!isPassword) {
            return res.status(400).json({
                error: { status: "fail", message: "Invalid password" }
            });
        }
        const isEmail = value.oldEmail === user.email;
        if (!isEmail) {
            return res.status(400).json({
                error: { status: "fail", message: "Current Email must be correct" }
            });
        }
        yield models_1.User.findOneAndUpdate({ _id: user._id }, { email: value.newEmail }, { new: true });
        return res.status(201).json({
            status: "success",
            data: user
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.changeEmail = changeEmail;
