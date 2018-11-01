"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var HttpError = (function (_super) {
    __extends(HttpError, _super);
    function HttpError(message, status, response, code) {
        if (code === void 0) { code = null; }
        var _this = _super.call(this, message) || this;
        _this.code = null;
        _this.response = null;
        _this.message = message;
        _this.status = status;
        _this.response = response;
        _this.httpStatus = _.get(response, 'status');
        _this.code = code;
        return _this;
    }
    HttpError.ParseAxiosError = function (axiosError) {
        return new HttpError(_.get(axiosError, 'response.data.error.message'), _.get(axiosError, 'response.data.error.status'), _.get(axiosError, 'response'), _.get(axiosError, 'response.data.error.code'));
    };
    return HttpError;
}(Error));
exports.HttpError = HttpError;
//# sourceMappingURL=httpError.js.map