"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var forta_agent_1 = require("forta-agent");
var handler_1 = require("./handler");
var TraceCalls = /** @class */ (function (_super) {
    __extends(TraceCalls, _super);
    function TraceCalls(options) {
        var _this = _super.call(this, options) || this;
        if (_this.options.from)
            _this.options.from = _this.options.from.toLowerCase();
        if (_this.options.to)
            _this.options.to = _this.options.to.toLowerCase();
        return _this;
    }
    TraceCalls.prototype.filterFunction = function (txEvent) {
        var _this = this;
        var _a, _b, _c, _d;
        if (!txEvent.traces || !txEvent.traces.length) {
            return [];
        }
        var traces = txEvent.traces.filter(function (trace) {
            if (_this.options.from !== undefined && _this.options.from !== trace.action.from.toLowerCase()) {
                return false;
            }
            if (_this.options.to !== undefined && _this.options.to !== trace.action.to.toLowerCase()) {
                return false;
            }
            if (!_this.options.includeErrors && trace.error) {
                return false;
            }
            return true;
        });
        var iface = new forta_agent_1.ethers.utils.Interface(this.options.signatures);
        var results = [];
        for (var _i = 0, traces_1 = traces; _i < traces_1.length; _i++) {
            var trace = traces_1[_i];
            var tx = void 0;
            try {
                tx = iface.parseTransaction({
                    data: trace.action.input,
                    value: trace.action.value,
                });
            }
            catch (_e) {
                continue;
            }
            if (!trace.error) {
                results.push(__assign(__assign({}, tx), { from: (_a = trace.action.from) === null || _a === void 0 ? void 0 : _a.toLowerCase(), to: (_b = trace.action.to) === null || _b === void 0 ? void 0 : _b.toLowerCase(), error: false, output: iface.decodeFunctionResult(tx.functionFragment, trace.result.output), trace: trace }));
            }
            else {
                results.push(__assign(__assign({}, tx), { from: (_c = trace.action.from) === null || _c === void 0 ? void 0 : _c.toLowerCase(), to: (_d = trace.action.to) === null || _d === void 0 ? void 0 : _d.toLowerCase(), error: true, output: null, trace: trace }));
            }
        }
        return results;
    };
    TraceCalls.prototype.metadata = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var calls_1, args_1, outputs_1;
            var _this = this;
            return __generator(this, function (_a) {
                if (event instanceof forta_agent_1.BlockEvent) {
                    return [2 /*return*/, null];
                }
                else {
                    calls_1 = this.filterFunction(event);
                    args_1 = calls_1.map(function (call) { return call.args; });
                    outputs_1 = calls_1.map(function (call) { return call.output; });
                    return [2 /*return*/, calls_1.filter(function (call, idx) {
                            if (_this.options.filterByArguments !== undefined && !_this.options.filterByArguments(call.args, idx, args_1)) {
                                return false;
                            }
                            if (_this.options.filterByOutput !== undefined &&
                                call.output !== null &&
                                !_this.options.filterByOutput(call.output, idx, outputs_1)) {
                                return false;
                            }
                            if (_this.options.filter !== undefined && !_this.options.filter(call, idx, calls_1)) {
                                return false;
                            }
                            return true;
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    return TraceCalls;
}(handler_1.Handler));
exports.default = TraceCalls;
