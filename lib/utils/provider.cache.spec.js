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
var jest_when_1 = require("jest-when");
var _1 = require(".");
var test_1 = require("../test");
var provider_cache_1 = require("./provider.cache");
var ExtendedMockEthersProvider = /** @class */ (function (_super) {
    __extends(ExtendedMockEthersProvider, _super);
    function ExtendedMockEthersProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.internalBlockNumber = 0;
        return _this;
    }
    ExtendedMockEthersProvider.prototype.setInternalBlockNumber = function (blockNumber) {
        this.internalBlockNumber = blockNumber;
    };
    ExtendedMockEthersProvider.prototype._getTransactionRequest = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var _getTransactionRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _getTransactionRequest = forta_agent_1.ethers.providers.BaseProvider.prototype._getTransactionRequest.bind({
                            formatter: forta_agent_1.ethers.providers.BaseProvider.getFormatter(),
                            _getAddress: function (address) {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, address];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            },
                        });
                        return [4 /*yield*/, _getTransactionRequest(transaction)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExtendedMockEthersProvider.prototype._getBlockTag = function (blockTag) {
        return __awaiter(this, void 0, void 0, function () {
            var internalBlockNumber, _getBlockTag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        internalBlockNumber = this.internalBlockNumber;
                        _getBlockTag = forta_agent_1.ethers.providers.BaseProvider.prototype._getBlockTag.bind({
                            formatter: forta_agent_1.ethers.providers.BaseProvider.getFormatter(),
                            pollingInterval: 0,
                            _getInternalBlockNumber: function (maxAge) {
                                return internalBlockNumber;
                            },
                        });
                        return [4 /*yield*/, _getBlockTag(blockTag)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ExtendedMockEthersProvider;
}(test_1.MockEthersProvider));
var OPTIONS = {
    blockDataCacheSize: 10,
    immutableDataCacheSize: 10,
};
var cacheKey = function (to, data, blockTag, cacheByBlockTag) {
    var block = cacheByBlockTag ? forta_agent_1.ethers.utils.hexValue(blockTag).slice(2) : "";
    var isOddLength = (to.length + data.length + block.length) & 1;
    return Buffer.from("".concat(to.slice(2)).concat(isOddLength ? "0" : "").concat(block).concat(data.slice(2)), "hex").toString("base64");
};
var TEST_IFACE = new forta_agent_1.ethers.utils.Interface([
    "function test1()",
    "function test2(uint256)",
    "function test3() returns (uint256)",
    "function test4(uint256) returns (uint256)",
]);
var TEST_ADDRESS = (0, _1.createAddress)("0x1");
describe("ProviderCache tests suite", function () {
    var mockProvider;
    var provider;
    var addCalls = function (test2Param, test3Return, test4Param, test4Return, blockTag) {
        mockProvider.addCallTo(TEST_ADDRESS, blockTag, TEST_IFACE, "test1", { inputs: [], outputs: [] });
        mockProvider.addCallTo(TEST_ADDRESS, blockTag, TEST_IFACE, "test2", {
            inputs: [forta_agent_1.ethers.BigNumber.from(test2Param)],
            outputs: [],
        });
        mockProvider.addCallTo(TEST_ADDRESS, blockTag, TEST_IFACE, "test3", {
            inputs: [],
            outputs: [forta_agent_1.ethers.BigNumber.from(test3Return)],
        });
        mockProvider.addCallTo(TEST_ADDRESS, blockTag, TEST_IFACE, "test4", {
            inputs: [forta_agent_1.ethers.BigNumber.from(test4Param)],
            outputs: [forta_agent_1.ethers.BigNumber.from(test4Return)],
        });
        return [
            {
                data: TEST_IFACE.encodeFunctionData("test1", []),
                result: TEST_IFACE.encodeFunctionResult("test1", []),
            },
            {
                data: TEST_IFACE.encodeFunctionData("test2", [forta_agent_1.ethers.BigNumber.from(test2Param)]),
                result: TEST_IFACE.encodeFunctionResult("test2", []),
            },
            {
                data: TEST_IFACE.encodeFunctionData("test3", []),
                result: TEST_IFACE.encodeFunctionResult("test3", [forta_agent_1.ethers.BigNumber.from(test3Return)]),
            },
            {
                data: TEST_IFACE.encodeFunctionData("test4", [forta_agent_1.ethers.BigNumber.from(test4Param)]),
                result: TEST_IFACE.encodeFunctionResult("test4", [forta_agent_1.ethers.BigNumber.from(test4Return)]),
            },
        ];
    };
    beforeAll(function () {
        provider_cache_1.ProviderCache.set(OPTIONS);
    });
    beforeEach(function () {
        mockProvider = new ExtendedMockEthersProvider();
        provider = mockProvider;
        // resetting caches as it would be when creating the first proxy
        provider_cache_1.ProviderCache["blockDataCache"] = undefined;
        provider_cache_1.ProviderCache["immutableDataCache"] = undefined;
    });
    it("should proxy properties from the original provider and return a modified version of call()", function () {
        var provider = new forta_agent_1.ethers.providers.JsonRpcProvider("test", 1);
        var cachedProvider = provider_cache_1.ProviderCache.createProxy(provider);
        for (var key in provider) {
            var member = key;
            if (key !== "call") {
                expect(cachedProvider[member]).toStrictEqual(provider[member]);
            }
            else {
                expect(typeof cachedProvider[member]).toBe("function");
                expect(cachedProvider[member]).not.toStrictEqual(provider.call);
            }
        }
    });
    it("should proxy directly (also not caching) calls made with latest or decimal block tags and calls made without a to address", function () { return __awaiter(void 0, void 0, void 0, function () {
        var cachedProvider, encodedInfos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cachedProvider = provider_cache_1.ProviderCache.createProxy(provider);
                    encodedInfos = addCalls("1", "2", "3", "4", "latest");
                    return [4 /*yield*/, cachedProvider.call({ to: TEST_ADDRESS, data: encodedInfos[0].data }, "latest")];
                case 1:
                    _a.sent();
                    expect(provider_cache_1.ProviderCache["blockDataCache"].size).toBe(0);
                    expect(provider_cache_1.ProviderCache["immutableDataCache"]).toBeUndefined();
                    encodedInfos = addCalls("1", "2", "3", "4", 0.1);
                    // this wouldn't work in a real provider, but in the mock provider a call with 0.1 block will not fail if
                    // the added call block tag is also 0.1
                    return [4 /*yield*/, cachedProvider.call({ to: TEST_ADDRESS, data: encodedInfos[0].data }, 0.1)];
                case 2:
                    // this wouldn't work in a real provider, but in the mock provider a call with 0.1 block will not fail if
                    // the added call block tag is also 0.1
                    _a.sent();
                    expect(provider_cache_1.ProviderCache["blockDataCache"].size).toBe(0);
                    expect(provider_cache_1.ProviderCache["immutableDataCache"]).toBeUndefined();
                    (0, jest_when_1.when)(mockProvider.call).calledWith({ data: "0x" }, 0).mockReturnValue(Promise.resolve("0x"));
                    return [4 /*yield*/, cachedProvider.call({ data: "0x" }, 0)];
                case 3:
                    _a.sent();
                    expect(provider_cache_1.ProviderCache["blockDataCache"].size).toBe(0);
                    expect(provider_cache_1.ProviderCache["immutableDataCache"]).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should cache a call with valid block tag if cacheByBlockTag is set", function () { return __awaiter(void 0, void 0, void 0, function () {
        var cachedProvider, encodedInfos, expectedCacheSize, _i, encodedInfos_1, encodedInfo, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cachedProvider = provider_cache_1.ProviderCache.createProxy(provider);
                    encodedInfos = addCalls("5", "6", "7", "8", 1);
                    expectedCacheSize = 0;
                    _i = 0, encodedInfos_1 = encodedInfos;
                    _b.label = 1;
                case 1:
                    if (!(_i < encodedInfos_1.length)) return [3 /*break*/, 4];
                    encodedInfo = encodedInfos_1[_i];
                    _a = expect;
                    return [4 /*yield*/, cachedProvider.call({ to: TEST_ADDRESS, data: encodedInfo.data }, 1)];
                case 2:
                    _a.apply(void 0, [_b.sent()]).toBe(encodedInfo.result);
                    expect(provider_cache_1.ProviderCache["blockDataCache"].size).toBe(++expectedCacheSize);
                    expect(provider_cache_1.ProviderCache["blockDataCache"].has(cacheKey(TEST_ADDRESS, encodedInfo.data, 1, true))).toBe(true);
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    expect(provider_cache_1.ProviderCache["immutableDataCache"]).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should cache a call with valid block tag if cacheByBlockTag is not set", function () { return __awaiter(void 0, void 0, void 0, function () {
        var cachedProvider, encodedInfos, expectedCacheSize, _i, encodedInfos_2, encodedInfo, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cachedProvider = provider_cache_1.ProviderCache.createProxy(provider, false);
                    encodedInfos = addCalls("9", "10", "11", "12", 1);
                    expectedCacheSize = 0;
                    _i = 0, encodedInfos_2 = encodedInfos;
                    _b.label = 1;
                case 1:
                    if (!(_i < encodedInfos_2.length)) return [3 /*break*/, 4];
                    encodedInfo = encodedInfos_2[_i];
                    _a = expect;
                    return [4 /*yield*/, cachedProvider.call({ to: TEST_ADDRESS, data: encodedInfo.data }, 1)];
                case 2:
                    _a.apply(void 0, [_b.sent()]).toBe(encodedInfo.result);
                    expect(provider_cache_1.ProviderCache["immutableDataCache"].size).toBe(++expectedCacheSize);
                    expect(provider_cache_1.ProviderCache["immutableDataCache"].has(cacheKey(TEST_ADDRESS, encodedInfo.data, 1, false))).toBe(true);
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    expect(provider_cache_1.ProviderCache["blockDataCache"]).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should clear the block data cache on clear() if it is not undefined", function () { return __awaiter(void 0, void 0, void 0, function () {
        var blockCachedProvider, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockCachedProvider = provider_cache_1.ProviderCache.createProxy(provider, true);
                    data = addCalls("13", "14", "15", "16", 1)[0].data;
                    expect(provider_cache_1.ProviderCache["blockDataCache"].size).toBe(0);
                    expect(provider_cache_1.ProviderCache["immutableDataCache"]).toBeUndefined();
                    return [4 /*yield*/, blockCachedProvider.call({ to: TEST_ADDRESS, data: data }, 1)];
                case 1:
                    _a.sent();
                    expect(provider_cache_1.ProviderCache["blockDataCache"].size).toBe(1);
                    expect(provider_cache_1.ProviderCache["immutableDataCache"]).toBeUndefined();
                    provider_cache_1.ProviderCache.clear();
                    expect(provider_cache_1.ProviderCache["blockDataCache"].size).toBe(0);
                    expect(provider_cache_1.ProviderCache["immutableDataCache"]).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should clear the immutable data cache on clear() if it is not undefined", function () { return __awaiter(void 0, void 0, void 0, function () {
        var immutableCachedProvider, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    immutableCachedProvider = provider_cache_1.ProviderCache.createProxy(provider, false);
                    data = addCalls("13", "14", "15", "16", 1)[0].data;
                    expect(provider_cache_1.ProviderCache["immutableDataCache"].size).toBe(0);
                    expect(provider_cache_1.ProviderCache["blockDataCache"]).toBeUndefined();
                    return [4 /*yield*/, immutableCachedProvider.call({ to: TEST_ADDRESS, data: data }, 1)];
                case 1:
                    _a.sent();
                    expect(provider_cache_1.ProviderCache["immutableDataCache"].size).toBe(1);
                    expect(provider_cache_1.ProviderCache["blockDataCache"]).toBeUndefined();
                    provider_cache_1.ProviderCache.clear();
                    expect(provider_cache_1.ProviderCache["immutableDataCache"].size).toBe(0);
                    expect(provider_cache_1.ProviderCache["blockDataCache"]).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should clear both caches on clear() if both are not undefined", function () { return __awaiter(void 0, void 0, void 0, function () {
        var blockCachedProvider, immutableCachedProvider, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockCachedProvider = provider_cache_1.ProviderCache.createProxy(provider, true);
                    immutableCachedProvider = provider_cache_1.ProviderCache.createProxy(provider, false);
                    data = addCalls("13", "14", "15", "16", 1)[0].data;
                    expect(provider_cache_1.ProviderCache["blockDataCache"].size).toBe(0);
                    expect(provider_cache_1.ProviderCache["immutableDataCache"].size).toBe(0);
                    return [4 /*yield*/, blockCachedProvider.call({ to: TEST_ADDRESS, data: data }, 1)];
                case 1:
                    _a.sent();
                    expect(provider_cache_1.ProviderCache["blockDataCache"].size).toBe(1);
                    expect(provider_cache_1.ProviderCache["immutableDataCache"].size).toBe(0);
                    return [4 /*yield*/, immutableCachedProvider.call({ to: TEST_ADDRESS, data: data }, 1)];
                case 2:
                    _a.sent();
                    expect(provider_cache_1.ProviderCache["blockDataCache"].size).toBe(1);
                    expect(provider_cache_1.ProviderCache["immutableDataCache"].size).toBe(1);
                    provider_cache_1.ProviderCache.clear();
                    expect(provider_cache_1.ProviderCache["blockDataCache"].size).toBe(0);
                    expect(provider_cache_1.ProviderCache["immutableDataCache"].size).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
