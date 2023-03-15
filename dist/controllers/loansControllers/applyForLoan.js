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
exports.applyForLoan = void 0;
const models_1 = require("../../models");
const utils_1 = require("../../utils");
const validators_1 = require("../../validators");
const applyForLoan = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = validators_1.loanValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: { message: error.details[0].message }
            });
        }
        //@ts-ignore
        const { validId, photo: avatar } = req.files;
        if (!validId) {
            return res.status(400).json({
                error: { message: "A valid ID must be uploaded" }
            });
        }
        if (!avatar) {
            return res.status(400).json({
                error: { message: "User photo must be uploaded" }
            });
        }
        console.log(req.body);
        value.property = value.propertyId;
        console.log(value);
        const media = yield (0, utils_1.uploads)(validId[0]);
        value.validIdURL = media.imageURL;
        value.validIdMedia = media;
        const media1 = yield (0, utils_1.uploads)(validId[0]);
        value.avatarURL = media1.imageURL;
        value.avatarMedia = media1;
        //@ts-ignore
        const { _id } = req.user;
        const loanData = {
            appliedBy: _id,
            loanAmount: value.loanAmount,
            interestAmount: value.interestAmount,
            property: value.propertyId
        };
        const user = yield models_1.User.findOneAndUpdate({ _id }, value, { new: true });
        const loan = yield models_1.Loan.create(loanData);
        return res.status(200).json({ status: "success", data: { loan, user } });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.applyForLoan = applyForLoan;
