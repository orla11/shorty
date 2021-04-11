"use strict";
// import 'reflect-metadata';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var config_1 = __importDefault(require("../config"));
var valid_url_1 = __importDefault(require("valid-url"));
var shortyService_1 = __importDefault(require("../services/shortyService"));
var NAMESPACE = 'shorty Controller';
var shortUrl = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, shortyServiceInstance, originalUrl, baseUrl, url, shortenedUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                shortyServiceInstance = typedi_1.Container.get(shortyService_1.default);
                logger.debug("[" + NAMESPACE + "] - Shorty route controller: calling /shorty with body: %o", req.body);
                originalUrl = req.body.originalUrl;
                baseUrl = config_1.default.server.hostname + ':' + config_1.default.server.port + config_1.default.api.prefix + '/shorty';
                if (!isValidUrl(originalUrl))
                    return [2 /*return*/, res.status(500).json('Internal Server Error.')];
                if (!isValidUrl(originalUrl)) return [3 /*break*/, 3];
                return [4 /*yield*/, shortyServiceInstance.urlExists(originalUrl)];
            case 1:
                url = _a.sent();
                if (url)
                    return [2 /*return*/, res.status(200).json(url)];
                return [4 /*yield*/, shortyServiceInstance.shortUrl(baseUrl, originalUrl)];
            case 2:
                shortenedUrl = _a.sent();
                return [2 /*return*/, res.status(201).json(shortenedUrl)];
            case 3: return [2 /*return*/, res.status(400).json('Invalid URL. Enter a valid url.')];
        }
    });
}); };
var getShortUrl = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, shortyServiceInstance, urlCode, url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = typedi_1.Container.get('logger');
                shortyServiceInstance = typedi_1.Container.get(shortyService_1.default);
                logger.debug("[" + NAMESPACE + "] - Shorty route controller: calling get /shorty with params: %o", req.params);
                urlCode = req.params.shortUrl;
                return [4 /*yield*/, shortyServiceInstance.loadShortUrl(urlCode)];
            case 1:
                url = _a.sent();
                if (!url)
                    return [2 /*return*/, res.status(400).json('Short url not found')];
                if (isClicksLimitReached(url.clicksCount)) {
                    logger.info("[" + NAMESPACE + "] - The short url " + url.shortUrl + " clicks limit has been reached.");
                    return [2 /*return*/, res.status(400).json("The short url " + url.shortUrl + " clicks limit has been reached.")];
                }
                url.clicksCount++;
                return [4 /*yield*/, shortyServiceInstance.updateUrlClicksCount(urlCode, url.clicksCount)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.redirect(url.originalUrl)];
        }
    });
}); };
var isValidUrl = function (originalUrl) {
    return valid_url_1.default.isUri(originalUrl);
};
var isClicksLimitReached = function (clicksCount) {
    return clicksCount >= config_1.default.api.allowedClicks;
};
exports.default = { shortUrl: shortUrl, getShortUrl: getShortUrl };
