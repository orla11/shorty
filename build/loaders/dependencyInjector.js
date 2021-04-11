"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var logger_1 = __importDefault(require("./logger"));
var nanoid_1 = __importDefault(require("./nanoid"));
exports.default = (function (_a) {
    var models = _a.models;
    try {
        models.forEach(function (m) {
            typedi_1.Container.set(m.name, m.model);
        });
        typedi_1.Container.set('logger', logger_1.default);
        typedi_1.Container.set('nanoid', nanoid_1.default);
    }
    catch (e) {
        logger_1.default.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
});
