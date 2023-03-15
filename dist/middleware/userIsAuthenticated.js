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
exports.userIsAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const models_1 = require("../models");
const userIsAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = req.headers;
    //   console.log(headers);
    let token = headers["authorization"];
    //   console.log(token);
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }
    token = token.split(" ")[1];
    try {
        const payload = yield jsonwebtoken_1.default.verify(token, config_1.constants.USER_TOKEN_SECRET);
        console.log(payload);
        //@ts-ignore
        req.user = yield models_1.User.findOne({ _id: payload._id }).select("+password");
        next();
    }
    catch (err) {
        return res.status(403).json(err);
    }
});
exports.userIsAuthenticated = userIsAuthenticated;
