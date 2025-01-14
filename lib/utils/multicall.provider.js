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
exports.MulticallProvider = exports.MulticallContract = exports.MULTICALL2_ABI = void 0;
var contracts_1 = require("@ethersproject/contracts");
var abi_1 = require("ethers-multicall/dist/abi");
var ethers_multicall_1 = require("ethers-multicall");
Object.defineProperty(exports, "MulticallContract", { enumerable: true, get: function () { return ethers_multicall_1.Contract; } });
exports.MULTICALL2_ABI = [
    "function tryAggregate(bool, tuple(address target, bytes callData)[] memory) public returns (tuple(bool success, bytes returnData)[] memory)",
];
// Multicall2 contract addresses used by this class.
var multicall2Addresses = {
    1: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
    3: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
    4: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    5: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    42: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    56: "0x012Cd050ACF174E41872Fd20B696ebaBdA117e9D",
    97: "0xf08eD5944312c1a0A364e1655D2738765111e61B",
    100: "0xFAa296891cA6CECAF2D86eF5F7590316d0A17dA0",
    128: "0xc9A1571bDE3498dd2e5a38f23d2EB1B7a0BbBB61",
    137: "0x1FE0Fed17D31c9d7e5E46424F17F56A26Bd3f41E",
    250: "0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4",
    42161: "0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4",
    43114: "0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4",
    80001: "0x9966772766e676aef1971a32C8f551f44F5cEd1E", // Mumbai
};
var DEFAULT_BATCH_SIZE = 50;
/**
 * Provider class heavily based on ethers-multicall, but supporting specifying a blockTag for the multicall contract
 * call and `tryAggregate`.
 */
var MulticallProvider = /** @class */ (function (_super) {
    __extends(MulticallProvider, _super);
    function MulticallProvider(provider, chainId) {
        var _this = _super.call(this, provider, chainId) || this;
        if (chainId !== undefined) {
            _this.setMulticallAddress(chainId);
        }
        return _this;
    }
    MulticallProvider.setMulticall2Addresses = function (addresses) {
        multicall2Addresses = __assign(__assign({}, multicall2Addresses), addresses);
    };
    MulticallProvider.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var chainId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._provider.getNetwork()];
                    case 1:
                        chainId = (_a.sent()).chainId;
                        this.setMulticallAddress(chainId);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Requires success of all calls.
     * @returns Tuple of format [success, results]. `success` indicates whether all the calls were successful or at least
     * one of them failed.
     */
    MulticallProvider.prototype.all = function (calls, blockTag, batchSize) {
        if (batchSize === void 0) { batchSize = DEFAULT_BATCH_SIZE; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._provider) {
                            throw new Error("Provider should be initialized before use.");
                        }
                        return [4 /*yield*/, this._all(calls, this._multicallAddress, this._provider, blockTag, batchSize)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Does not require success of calls, returns the success status and result of each call.
     */
    MulticallProvider.prototype.tryAll = function (calls, blockTag, batchSize) {
        if (batchSize === void 0) { batchSize = DEFAULT_BATCH_SIZE; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._provider) {
                    throw new Error("Provider should be initialized before use.");
                }
                return [2 /*return*/, this._tryAll(calls, this._multicallAddress, this._provider, blockTag, batchSize)];
            });
        });
    };
    /**
     * Similar to `all` but supports a group of calls as an input. Preserves the inputs calls structure.
     */
    MulticallProvider.prototype.groupAll = function (callGroups, blockTag, batchSize) {
        if (batchSize === void 0) { batchSize = DEFAULT_BATCH_SIZE; }
        return __awaiter(this, void 0, void 0, function () {
            var flatResults, success, i, resultsData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.all(callGroups.flat(), blockTag, batchSize)];
                    case 1:
                        flatResults = _a.sent();
                        success = flatResults[0];
                        i = 0;
                        resultsData = callGroups.map(function (group) {
                            return flatResults[1].slice(i, (i += group.length));
                        });
                        return [2 /*return*/, [success, success ? resultsData : []]];
                }
            });
        });
    };
    /**
     * Similar to `tryAll` but supports a group of calls as an input. Preserves the inputs calls structure.
     */
    MulticallProvider.prototype.groupTryAll = function (callGroups, blockTag, batchSize) {
        if (batchSize === void 0) { batchSize = DEFAULT_BATCH_SIZE; }
        return __awaiter(this, void 0, void 0, function () {
            var flatResults, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tryAll(callGroups.flat(), blockTag, batchSize)];
                    case 1:
                        flatResults = _a.sent();
                        i = 0;
                        return [2 /*return*/, callGroups.map(function (group) {
                                return flatResults.slice(i, (i += group.length));
                            })];
                }
            });
        });
    };
    MulticallProvider.prototype._tryAll = function (calls, multicallAddress, provider, blockTag, batchSize) {
        if (batchSize === void 0) { batchSize = DEFAULT_BATCH_SIZE; }
        return __awaiter(this, void 0, void 0, function () {
            var multicall2, requests, batches, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        multicall2 = new contracts_1.Contract(multicallAddress, exports.MULTICALL2_ABI, provider);
                        requests = calls.map(function (call) { return ({
                            target: call.contract.address,
                            callData: abi_1.Abi.encode(call.name, call.inputs, call.params),
                        }); });
                        batches = this.batchArray(requests, batchSize);
                        return [4 /*yield*/, Promise.all(batches.map(function (batch) { return multicall2.callStatic.tryAggregate(false, batch, { blockTag: blockTag }); }))];
                    case 1:
                        results = (_a.sent()).flat();
                        return [2 /*return*/, results.map(function (result, idx) {
                                var call = calls[idx];
                                if (result.success) {
                                    var params = abi_1.Abi.decode(call.outputs, result.returnData);
                                    return { success: result.success, returnData: call.outputs.length === 1 ? params[0] : params };
                                }
                                else {
                                    return { success: result.success, returnData: [] };
                                }
                            })];
                }
            });
        });
    };
    MulticallProvider.prototype._all = function (calls, multicallAddress, provider, blockTag, batchSize) {
        if (batchSize === void 0) { batchSize = DEFAULT_BATCH_SIZE; }
        return __awaiter(this, void 0, void 0, function () {
            var multicall2, requests, batches, results, decodedResults, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        multicall2 = new contracts_1.Contract(multicallAddress, exports.MULTICALL2_ABI, provider);
                        requests = calls.map(function (call) { return ({
                            target: call.contract.address,
                            callData: abi_1.Abi.encode(call.name, call.inputs, call.params),
                        }); });
                        batches = this.batchArray(requests, batchSize);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all(batches.map(function (batch) { return multicall2.callStatic.tryAggregate(true, batch, { blockTag: blockTag }); }))];
                    case 2:
                        results = (_a.sent()).flat();
                        decodedResults = results.map(function (result, idx) {
                            var call = calls[idx];
                            var params = abi_1.Abi.decode(call.outputs, result.returnData);
                            return { success: result.success, returnData: call.outputs.length === 1 ? params[0] : params };
                        });
                        return [2 /*return*/, [true, decodedResults.map(function (result) { return result.returnData; })]];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, [false, []]];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Helper function to split the calls array into sub-arrays of size n.
     */
    MulticallProvider.prototype.batchArray = function (calls, batchSize) {
        var subArrays = [];
        for (var i = 0; i < calls.length; i += batchSize) {
            // @ts-ignore
            subArrays.push(calls.slice(i, i + batchSize));
        }
        return subArrays;
    };
    /**
     * Sets the Multicall2 contract address to a specific chain ID deployed contract.
     * Throws an error if there's no known contract address for that chain ID.
     */
    MulticallProvider.prototype.setMulticallAddress = function (chainId) {
        if (multicall2Addresses[chainId] === undefined) {
            throw new Error("Unsupported chain ID: ".concat(chainId, ". Please set a Multicall2 address for it through MulticallProvider.setMulticall2Addresses()"));
        }
        this._multicallAddress = multicall2Addresses[chainId];
    };
    return MulticallProvider;
}(ethers_multicall_1.Provider));
exports.MulticallProvider = MulticallProvider;
