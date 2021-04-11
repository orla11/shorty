"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var shortyController_1 = __importDefault(require("../../controllers/shortyController"));
var shortyValidator_1 = __importDefault(require("../validators/shortyValidator"));
var route = express_1.Router();
exports.default = (function (app) {
    app.use('/shorty', route);
    route.post('/', shortyValidator_1.default.validateOriginalUrl, shortyController_1.default.shortUrl);
    route.get('/:shortUrl', shortyController_1.default.getShortUrl);
});
