"use strict";
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
var test_1 = require("../test");
var _1 = require(".");
var multicall_provider_1 = require("./multicall.provider");
var forta_agent_1 = require("forta-agent");
describe("MulticallProvider test suite", function () {
    var MULTICALL_IFACE = new forta_agent_1.ethers.utils.Interface(multicall_provider_1.MULTICALL2_ABI);
    var TEST_MULTICALL2_ADDRESSES = {
        0: (0, _1.createAddress)("0xffe"), // networkId and multicall2 address used for tests
    };
    var TEST_ABI = [
        "function func1() external view returns (uint)",
        "function func2() external view returns (uint)",
        "function func3(uint) external view returns (uint)",
        "function func4(address) external view returns (uint)",
    ];
    var TEST_IFACE = new forta_agent_1.ethers.utils.Interface(TEST_ABI);
    var TEST_BLOCKS = [12, 13, 15, 22];
    var TEST_ADDR = (0, _1.createAddress)("0xa1");
    var contract = new multicall_provider_1.MulticallContract(TEST_ADDR, TEST_ABI);
    var TEST_CALLS = [
        contract.func1(),
        contract.func2(),
        contract.func3(forta_agent_1.ethers.BigNumber.from(5)),
        contract.func4((0, _1.createAddress)("0xb1")),
    ];
    var TEST_OUTPUTS = TEST_CALLS.map(function (call) { return forta_agent_1.ethers.BigNumber.from(forta_agent_1.ethers.utils.formatBytes32String(call.name)); });
    var addCallTo = function (block, indexes, inputs) {
        for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
            var index = indexes_1[_i];
            mockEthersProvider.addCallTo(TEST_ADDR, block, TEST_IFACE, TEST_CALLS[index].name, {
                inputs: TEST_CALLS[index].params,
                outputs: [TEST_OUTPUTS[index]],
            });
        }
    };
    var generateMockProviderCall = function () {
        var _call = mockEthersProvider.call;
        mockEthersProvider.call = jest.fn().mockImplementation(function (_a, blockTag) {
            var data = _a.data, to = _a.to, from = _a.from;
            return __awaiter(void 0, void 0, void 0, function () {
                var args_1, outputs, results;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(to.toLowerCase() === TEST_MULTICALL2_ADDRESSES[0])) return [3 /*break*/, 2];
                            args_1 = MULTICALL_IFACE.decodeFunctionData("tryAggregate", data);
                            return [4 /*yield*/, Promise.all(args_1[1].map(function (call) { return __awaiter(void 0, void 0, void 0, function () {
                                    var output, _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 2, , 3]);
                                                return [4 /*yield*/, mockEthersProvider.call({ data: call.callData, to: call.target }, blockTag)];
                                            case 1:
                                                output = _b.sent();
                                                return [2 /*return*/, output];
                                            case 2:
                                                _a = _b.sent();
                                                return [2 /*return*/, null];
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            outputs = _b.sent();
                            results = outputs.map(function (output) {
                                if (!output && args_1[0])
                                    throw Error("Call failed");
                                return { success: output !== null, returnData: output !== null ? output : "0x" };
                            });
                            return [2 /*return*/, MULTICALL_IFACE.encodeFunctionResult("tryAggregate", [results])];
                        case 2: return [2 /*return*/, _call({ data: data, to: to, from: from })];
                    }
                });
            });
        });
    };
    // generate sub arrays of the initial one, following `destribution`.
    var generateStructuredArray = function (array, destribution) {
        // note that sum(destribution) should be equals to calls.length
        var structuredArray = [];
        var i = 0;
        for (var _i = 0, destribution_1 = destribution; _i < destribution_1.length; _i++) {
            var dest = destribution_1[_i];
            // @ts-ignore
            structuredArray.push(array.slice(i, i + dest));
            i += dest;
        }
        return structuredArray;
    };
    var TEST_DESTRIBUTIONS = [[1, 1, 1, 1], [2, 2], [3, 1], [4]];
    var multicallProvider;
    var mockEthersProvider;
    beforeAll(function () {
        mockEthersProvider = new test_1.MockEthersProvider();
        mockEthersProvider.setNetwork(0);
        generateMockProviderCall();
        multicall_provider_1.MulticallProvider.setMulticall2Addresses(TEST_MULTICALL2_ADDRESSES);
        multicallProvider = new multicall_provider_1.MulticallProvider(mockEthersProvider, 0);
    });
    beforeEach(function () {
        mockEthersProvider.clear();
        mockEthersProvider.setNetwork(0);
    });
    describe("constructor", function () {
        it("should get the correct Multicall2 address when specifying the chain ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            var multicallProvider;
            return __generator(this, function (_a) {
                multicallProvider = new multicall_provider_1.MulticallProvider(mockEthersProvider, 0);
                expect(multicallProvider["_multicallAddress"]).toBe(TEST_MULTICALL2_ADDRESSES[0]);
                return [2 /*return*/];
            });
        }); });
        it("should throw an error if there's no known Multicall2 address for a chain ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(function () {
                    new multicall_provider_1.MulticallProvider(mockEthersProvider, 500);
                }).toThrowError("Unsupported chain ID: 500. Please set a Multicall2 address for it through MulticallProvider.setMulticall2Addresses()");
                return [2 /*return*/];
            });
        }); });
    });
    describe("init", function () {
        it("should get the correct Multicall2 address when calling init", function () { return __awaiter(void 0, void 0, void 0, function () {
            var multicallProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        multicallProvider = new multicall_provider_1.MulticallProvider(mockEthersProvider);
                        return [4 /*yield*/, multicallProvider.init()];
                    case 1:
                        _a.sent();
                        expect(multicallProvider["_multicallAddress"]).toBe(TEST_MULTICALL2_ADDRESSES[0]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw an error if there's no known Multicall2 address for a chain ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            var multicallProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        multicallProvider = new multicall_provider_1.MulticallProvider(mockEthersProvider);
                        mockEthersProvider.setNetwork(500);
                        return [4 /*yield*/, expect(multicallProvider.init()).rejects.toEqual(new Error("Unsupported chain ID: 500. Please set a Multicall2 address for it through MulticallProvider.setMulticall2Addresses()"))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("all", function () {
        it("should return false when one of the calls fails", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addCallTo(TEST_BLOCKS[0], [0, 1, 2], []);
                        return [4 /*yield*/, multicallProvider.all(TEST_CALLS, TEST_BLOCKS[0])];
                    case 1:
                        response = _a.sent();
                        expect(response).toStrictEqual([false, []]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return expected results and success flag when all calls succeed", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addCallTo(TEST_BLOCKS[0], [0, 1, 2, 3], []);
                        return [4 /*yield*/, multicallProvider.all(TEST_CALLS, TEST_BLOCKS[0])];
                    case 1:
                        response = _a.sent();
                        expect(response).toStrictEqual([true, TEST_OUTPUTS]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("tryAll", function () {
        it("should return expected results when all calls fail", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, multicallProvider.tryAll(TEST_CALLS, TEST_BLOCKS[1])];
                    case 1:
                        response = _a.sent();
                        expect(response).toStrictEqual(TEST_CALLS.map(function () { return ({ success: false, returnData: [] }); }));
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return expected results when all calls succeed", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addCallTo(TEST_BLOCKS[2], [0, 1, 2, 3], []);
                        return [4 /*yield*/, multicallProvider.tryAll(TEST_CALLS, TEST_BLOCKS[2])];
                    case 1:
                        response = _a.sent();
                        expect(response).toStrictEqual([
                            { success: true, returnData: TEST_OUTPUTS[0] },
                            { success: true, returnData: TEST_OUTPUTS[1] },
                            { success: true, returnData: TEST_OUTPUTS[2] },
                            { success: true, returnData: TEST_OUTPUTS[3] },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return expected results when some of the calls fail", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addCallTo(TEST_BLOCKS[3], [0, 2], []);
                        return [4 /*yield*/, multicallProvider.tryAll(TEST_CALLS, TEST_BLOCKS[3])];
                    case 1:
                        response = _a.sent();
                        expect(response).toStrictEqual([
                            { success: true, returnData: TEST_OUTPUTS[0] },
                            { success: false, returnData: [] },
                            { success: true, returnData: TEST_OUTPUTS[2] },
                            { success: false, returnData: [] },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("groupAll", function () {
        it("should preserve the inputs structure when all calls succeed", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _i, TEST_DESTRIBUTIONS_1, dest, groupCalls, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, TEST_DESTRIBUTIONS_1 = TEST_DESTRIBUTIONS;
                        _a.label = 1;
                    case 1:
                        if (!(_i < TEST_DESTRIBUTIONS_1.length)) return [3 /*break*/, 4];
                        dest = TEST_DESTRIBUTIONS_1[_i];
                        groupCalls = generateStructuredArray(TEST_CALLS, dest);
                        addCallTo(TEST_BLOCKS[0], [0, 1, 2, 3], []);
                        return [4 /*yield*/, multicallProvider.groupAll(groupCalls, TEST_BLOCKS[0])];
                    case 2:
                        response = _a.sent();
                        expect(response).toStrictEqual([true, generateStructuredArray(TEST_OUTPUTS, dest)]);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("should return expected results when one of calls fail", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _i, TEST_DESTRIBUTIONS_2, dest, groupCalls, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, TEST_DESTRIBUTIONS_2 = TEST_DESTRIBUTIONS;
                        _a.label = 1;
                    case 1:
                        if (!(_i < TEST_DESTRIBUTIONS_2.length)) return [3 /*break*/, 4];
                        dest = TEST_DESTRIBUTIONS_2[_i];
                        groupCalls = generateStructuredArray(TEST_CALLS, dest);
                        addCallTo(TEST_BLOCKS[0], [0, 1, 2], []);
                        return [4 /*yield*/, multicallProvider.groupAll(groupCalls, TEST_BLOCKS[0])];
                    case 2:
                        response = _a.sent();
                        expect(response).toStrictEqual([false, []]);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe("groupTryAll", function () {
        it("should preserve the inputs structure when all calls succeed", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _i, TEST_DESTRIBUTIONS_3, dest, groupCalls, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, TEST_DESTRIBUTIONS_3 = TEST_DESTRIBUTIONS;
                        _a.label = 1;
                    case 1:
                        if (!(_i < TEST_DESTRIBUTIONS_3.length)) return [3 /*break*/, 4];
                        dest = TEST_DESTRIBUTIONS_3[_i];
                        groupCalls = generateStructuredArray(TEST_CALLS, dest);
                        addCallTo(TEST_BLOCKS[0], [0, 1, 2, 3], []);
                        return [4 /*yield*/, multicallProvider.groupTryAll(groupCalls, TEST_BLOCKS[0])];
                    case 2:
                        response = _a.sent();
                        expect(response).toStrictEqual(generateStructuredArray(TEST_OUTPUTS.map(function (output) { return ({ success: true, returnData: output }); }), dest));
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("should return expected results when all calls fail", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _i, TEST_DESTRIBUTIONS_4, dest, groupCalls, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, TEST_DESTRIBUTIONS_4 = TEST_DESTRIBUTIONS;
                        _a.label = 1;
                    case 1:
                        if (!(_i < TEST_DESTRIBUTIONS_4.length)) return [3 /*break*/, 4];
                        dest = TEST_DESTRIBUTIONS_4[_i];
                        groupCalls = generateStructuredArray(TEST_CALLS, dest);
                        return [4 /*yield*/, multicallProvider.groupTryAll(groupCalls, TEST_BLOCKS[0])];
                    case 2:
                        response = _a.sent();
                        expect(response).toStrictEqual(generateStructuredArray(TEST_CALLS.map(function () { return ({ success: false, returnData: [] }); }), dest));
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("should preserve the inputs structure when some of calls fail", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _i, TEST_DESTRIBUTIONS_5, dest, groupCalls, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, TEST_DESTRIBUTIONS_5 = TEST_DESTRIBUTIONS;
                        _a.label = 1;
                    case 1:
                        if (!(_i < TEST_DESTRIBUTIONS_5.length)) return [3 /*break*/, 4];
                        dest = TEST_DESTRIBUTIONS_5[_i];
                        groupCalls = generateStructuredArray(TEST_CALLS, dest);
                        addCallTo(TEST_BLOCKS[0], [0, 3], []);
                        return [4 /*yield*/, multicallProvider.groupTryAll(groupCalls, TEST_BLOCKS[0])];
                    case 2:
                        response = _a.sent();
                        expect(response).toStrictEqual(generateStructuredArray([
                            { success: true, returnData: TEST_OUTPUTS[0] },
                            { success: false, returnData: [] },
                            { success: false, returnData: [] },
                            { success: true, returnData: TEST_OUTPUTS[3] },
                        ], dest));
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
});
