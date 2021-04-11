"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Url = new mongoose_1.default.Schema({
    urlCode: String,
    originalUrl: {
        type: String,
        required: [true, 'Please provide a valid url']
    },
    shortUrl: String,
    clicksCount: Number
}, { timestamps: true });
exports.default = mongoose_1.default.model('Url', Url);
