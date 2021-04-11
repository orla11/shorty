"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var envFound = dotenv_1.default.config();
if (envFound.error)
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
var server = {
    hostname: process.env.SERVER_HOSTNAME || 'localhost',
    port: process.env.SERVER_PORT || 1337
};
var database = {
    URL: process.env.MONGODB_URI || 'mongodb://localhost:27017/example',
    testURL: process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/jest'
};
var logs = {
    level: process.env.LOG_LEVEL || 'silly'
};
var api = {
    prefix: '/api/v1',
    // useful option which might
    // be used for billing purposes
    allowedClicks: 10
};
var config = {
    server: server,
    api: api,
    database: database,
    logs: logs
};
exports.default = config;
