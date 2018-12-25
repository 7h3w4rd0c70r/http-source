"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var _ = require("lodash");
var jsignal_1 = require("jsignal");
var errors_1 = require("./errors");
var HttpSource = (function () {
    function HttpSource(baseUrl, options) {
        if (options === void 0) { options = {
            request: {
                contentType: 'application/json',
            },
        }; }
        var _this = this;
        this.globalHeaders = {};
        this.onHttpError = new jsignal_1.jSignal();
        this._ErrorParser = errors_1.HttpError.ParseAxiosError;
        this.setGlobalHeader = function (name, value) {
            _this.globalHeaders[name] = value;
        };
        this.removeGlobalHeader = function (name) {
            delete _this.globalHeaders[name];
        };
        this.listenToHttpErrors = function (listener) {
            _this.onHttpError.listen(listener);
        };
        this.unlistenToHttpErrors = function (listener) {
            _this.onHttpError.unlisten(listener);
        };
        this.httpGet = function (urlPath, queryParams, headers) {
            if (headers === void 0) { headers = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var response, err_1, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, this.remote.get(urlPath, { params: queryParams, headers: _.merge({}, { 'Content-Type': this.defaultContentType }, this.globalHeaders, headers) })];
                        case 1:
                            response = _a.sent();
                            return [2, response.data];
                        case 2:
                            err_1 = _a.sent();
                            error = this.ErrorParser(err_1);
                            this.onHttpError.dispatch(error);
                            throw error;
                        case 3: return [2];
                    }
                });
            });
        };
        this.httpPost = function (urlPath, body, headers) {
            if (headers === void 0) { headers = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var response, err_2, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, this.remote.post(urlPath, body, { headers: _.merge({}, { 'Content-Type': this.defaultContentType }, this.globalHeaders, headers) })];
                        case 1:
                            response = _a.sent();
                            return [2, response.data];
                        case 2:
                            err_2 = _a.sent();
                            error = this.ErrorParser(err_2);
                            this.onHttpError.dispatch(error);
                            throw error;
                        case 3: return [2];
                    }
                });
            });
        };
        this.httpPut = function (urlPath, body, headers) {
            if (headers === void 0) { headers = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var response, err_3, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, this.remote.put(urlPath, body, { headers: _.merge({}, { 'Content-Type': this.defaultContentType }, this.globalHeaders, headers) })];
                        case 1:
                            response = _a.sent();
                            return [2, response.data];
                        case 2:
                            err_3 = _a.sent();
                            error = this.ErrorParser(err_3);
                            this.onHttpError.dispatch(error);
                            throw error;
                        case 3: return [2];
                    }
                });
            });
        };
        this.httpDelete = function (urlPath, queryParams, headers) {
            if (headers === void 0) { headers = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var response, err_4, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, this.remote.delete(urlPath, { params: queryParams, headers: _.merge({}, { 'Content-Type': this.defaultContentType }, this.globalHeaders, headers) })];
                        case 1:
                            response = _a.sent();
                            return [2, response.data];
                        case 2:
                            err_4 = _a.sent();
                            error = this.ErrorParser(err_4);
                            this.onHttpError.dispatch(error);
                            throw error;
                        case 3: return [2];
                    }
                });
            });
        };
        this.httpPatch = function (urlPath, body, headers) {
            if (headers === void 0) { headers = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var response, err_5, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, this.remote.patch(urlPath, body, { headers: _.merge({}, { 'Content-Type': this.defaultContentType }, this.globalHeaders, headers) })];
                        case 1:
                            response = _a.sent();
                            return [2, response.data];
                        case 2:
                            err_5 = _a.sent();
                            error = this.ErrorParser(err_5);
                            this.onHttpError.dispatch(error);
                            throw error;
                        case 3: return [2];
                    }
                });
            });
        };
        this.remote = axios_1.default.create({ baseURL: baseUrl });
        if (options.request) {
            if (typeof options.request.contentType === 'string') {
                this.defaultContentType = options.request.contentType;
            }
        }
        if (options.error) {
            if (typeof options.error.parse === 'function') {
                this.ErrorParser = options.error.parse;
            }
        }
    }
    Object.defineProperty(HttpSource.prototype, "ErrorParser", {
        get: function () { return this._ErrorParser; },
        set: function (ErrorParser) {
            if (typeof ErrorParser === 'function') {
                this._ErrorParser = ErrorParser;
            }
        },
        enumerable: true,
        configurable: true
    });
    return HttpSource;
}());
exports.HttpSource = HttpSource;
//# sourceMappingURL=index.js.map