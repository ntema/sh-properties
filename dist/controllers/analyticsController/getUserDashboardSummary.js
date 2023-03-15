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
exports.getUserDashboardSummary = void 0;
const models_1 = require("../../models");
const getUserDashboardSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req;
        //@ts-ignore
        const { _id } = req.user;
        const propertiesCount = yield models_1.Property.find({
            uploadedBy: _id
        }).countDocuments();
        const bookingsCount = yield models_1.Booking.find({
            bookee: _id
        }).countDocuments();
        const wallet = yield models_1.User.findOne({
            _id
        }).select("wallet");
        return res.status(200).json({
            status: "success",
            data: { bookingsCount, propertiesCount, wallet }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserDashboardSummary = getUserDashboardSummary;
