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
exports.verifyAdmin = void 0;
const userIsAuthenticated_1 = require("./userIsAuthenticated");
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, userIsAuthenticated_1.userIsAuthenticated)(req, res, () => {
        //@ts-ignore
        if (['admin'].includes(req.user.role)) {
            next();
        }
    });
});
exports.verifyAdmin = verifyAdmin;
