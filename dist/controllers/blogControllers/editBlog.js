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
exports.editBlog = void 0;
const models_1 = require("../../models");
const editBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { body } = req;
        const update = yield models_1.Blog.findByIdAndUpdate(req.params.id, {
            $set: body
        }, { new: true });
        return res
            .status(200)
            .json({ message: "Update Successful", updated: body, update });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.editBlog = editBlog;
