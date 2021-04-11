"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiHealthCheck_1 = __importDefault(require("./routes/apiHealthCheck"));
var shorty_1 = __importDefault(require("./routes/shorty"));
exports.default = (function () {
    var app = express_1.Router();
    apiHealthCheck_1.default(app);
    shorty_1.default(app);
    return app;
});
