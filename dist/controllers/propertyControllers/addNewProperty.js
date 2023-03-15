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
exports.addNewProperty = void 0;
const models_1 = require("../../models");
const validators_1 = require("../../validators");
const slugify_1 = __importDefault(require("slugify"));
const utils_1 = require("../../utils");
const addNewProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { error, value } = validators_1.addPropertyValidator.validate(req.body);
        console.log(value);
        if (error) {
            console.log("here-2");
            return res.status(400).json({
                error: { message: error.details[0].message }
            });
        }
        let imagesURLs = [];
        let imagesMedia = [];
        const files = req.files;
        console.log(files);
        if (files && files.length > 0) {
            for (let file of files) {
                const media = yield (0, utils_1.uploads)(file);
                console.log(imagesURLs);
                imagesURLs.push(media.imageURL);
                imagesMedia.push(media);
            }
        }
        else {
            return res.status(401).json({
                error: { message: "At least one image must be uploaded" }
            });
        }
        value.imagesMedia = imagesMedia;
        value.imagesURLs = imagesURLs;
        value.name =
            value.name[0].toUpperCase() + value.name.substr(1).toLowerCase();
        let count = 0;
        let slug = (0, slugify_1.default)(value.name, { lower: true });
        value.nameSlug = slug;
        // value.location = JSON.parse(value.location);
        while (true) {
            const isProperty = yield models_1.Property.findOne({ nameSlug: value.nameSlug });
            if (!isProperty)
                break;
            count++;
            value.nameSlug = slug + "-" + count;
        }
        if (value.amenities) {
            if ((value === null || value === void 0 ? void 0 : value.amenities.type) == "string") {
                value.amenities = [value.amenities];
            }
            else {
                value.amenities = Array.from(new Set(value.amenities));
            }
        }
        console.log(value);
        //@ts-ignore
        value.uploadedBy = req.user._id;
        value.location = {
            state: value.state,
            LGA: value.LGA,
            city: value.city,
            address: value.address
        };
        const property = yield models_1.Property.create(value);
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
exports.addNewProperty = addNewProperty;
