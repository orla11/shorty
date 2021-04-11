"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiHealthCheck_1 = __importDefault(require("../../controllers/apiHealthCheck"));
var route = express_1.Router();
exports.default = (function (app) {
    app.use('/', route);
    route.get('/status', apiHealthCheck_1.default.apiHealthCheck);
});
