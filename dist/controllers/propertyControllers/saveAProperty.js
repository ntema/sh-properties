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
exports.saveAProperty = void 0;
const models_1 = require("../../models");
const validators_1 = require("../../validators");
const saveAProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = validators_1.saveAPropertyValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: { message: error.details[0].message }
            });
        }
        //@ts-ignore
        const { _id: savedBy } = req.user;
        const body = { property: value.propertyId, savedBy };
        const property = yield models_1.SavedProperty.create(body);
        return res.status(200).json({
            status: "success",
            data: property
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.saveAProperty = saveAProperty;
