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
exports.uploads = void 0;
const config_1 = require("../config");
const parser_1 = __importDefault(require("datauri/parser"));
const path_1 = require("path");
const parser = new parser_1.default();
const uploads = function uploads(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = body.buffer;
        // console.log(buffer)
        const ext = (0, path_1.extname)(body.originalname);
        const uri = parser.format(ext, buffer);
        const result = yield (0, config_1.cloudinaryConfig)(uri.content);
        const media = {
            asset_id: result.asset_id,
            public_id: result.public_id,
            type: result.resource_type,
            imageURL: result.secure_url,
            size: result.bytes
        };
        return media;
    });
};
exports.uploads = uploads;
