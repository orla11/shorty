"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var customAlphabetString = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var nanoidInstance = nanoid_1.customAlphabet(customAlphabetString, 10);
exports.default = nanoidInstance;
