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
exports.getApropertyBySlug = void 0;
const models_1 = require("../../models");
const getApropertyBySlug = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug: nameSlug } = req.params;
        const data = yield models_1.Property.findOne({ nameSlug });
        if (!data) {
            return res.status(404).json({
                status: "fail",
                message: "There is no property with the slug " + nameSlug
            });
        }
        return res.status(200).json({
            status: "success",
            data
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getApropertyBySlug = getApropertyBySlug;
