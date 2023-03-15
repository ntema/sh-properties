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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const models_1 = require("../../models");
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const _id = req.params.id;
        const user = yield models_1.User.findOne({ _id });
        const properties = yield models_1.Property.find({ uploadedBy: user._id });
        return res
            .status(200)
            .json({ status: "success", data: Object.assign(Object.assign({}, user.toObject()), { properties }) });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getUserById = getUserById;
