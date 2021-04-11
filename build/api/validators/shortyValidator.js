"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var NAMESPACE = 'shorty Validator';
var validateOriginalUrl = celebrate_1.celebrate({
    body: celebrate_1.Joi.object({
        originalUrl: celebrate_1.Joi.string().required()
    })
});
exports.default = { validateOriginalUrl: validateOriginalUrl };
