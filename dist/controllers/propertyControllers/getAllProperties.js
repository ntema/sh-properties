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
exports.getAllProperties = void 0;
const models_1 = require("../../models");
const getAllProperties = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("here");
        let { limit = 20, page = 1, user: uploadedBy } = req.query;
        page = page || 1;
        const skip = page ? (page - 1) * limit : 0;
        let option = uploadedBy
            ? { uploadedBy }
            : {};
        console.log(option);
        const count = yield models_1.Property.find(option).countDocuments();
        // const pages = count>0?Math.ceil(count / limit)?Math.ceil(count / limit): 1;
        let pages = 0;
        if (count > 0) {
            if (limit) {
                pages = Math.ceil(count / limit);
            }
            else {
                pages = 1;
            }
        }
        const result = {};
        limit = limit - 0;
        if (page * 1 < pages) {
            result.next = { limit, page: page * 1 + 1 };
        }
        if (page * 1 <= pages && page - 1 != 0) {
            result.previous = { limit, page: page - 1 };
        }
        const properties = yield models_1.Property.find(option)
            .populate("uploadedBy")
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip(skip);
        return res.status(200).json({
            status: "success",
            data: Object.assign(Object.assign({}, result), { count, pages, properties })
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProperties = getAllProperties;
