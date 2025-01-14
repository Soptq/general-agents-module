"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var forta_agent_1 = require("forta-agent");
var utils_1 = require("../utils");
var mock_ethers_provider_1 = __importDefault(require("./mock_ethers_provider"));
var EVENT_1_SIGHASH = (0, forta_agent_1.keccak256)("Event1()");
var EVENT_2_SIGHASH = (0, forta_agent_1.keccak256)("Event2()");
describe("MockEthersProvider tests suite", function () {
    var mockProvider = new mock_ethers_provider_1.default();
    beforeEach(function () { return mockProvider.clear(); });
    it.each(["call", "getBlock", "getSigner", "getStorageAt", "getBlockNumber", "getNetwork"])("%s should throw an error if not configured for a specific input", function (method) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(mockProvider[method]).rejects.toEqual(new Error("".concat(method, " was not configured for this input")))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return the correct storage", function () { return __awaiter(void 0, void 0, void 0, function () {
        var CASES, _i, CASES_1, _a, shortContract, slot, block, shortAddr, encodedSlot, contract, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    CASES = [
                        ["0xdef10", 1, 0, "0xe0a0"],
                        ["0xdef11", 21, 70, "0xe0a1"],
                        ["0xdef12", 100, 99, "0xe0a2"],
                        ["0xdef13", 4, 201, "0xe0a3"],
                        ["0xdef14", 42, 1234, "0xe0a4"],
                    ];
                    _i = 0, CASES_1 = CASES;
                    _d.label = 1;
                case 1:
                    if (!(_i < CASES_1.length)) return [3 /*break*/, 5];
                    _a = CASES_1[_i], shortContract = _a[0], slot = _a[1], block = _a[2], shortAddr = _a[3];
                    encodedSlot = ethers_1.utils.hexZeroPad(shortAddr, 32);
                    contract = (0, utils_1.createAddress)(shortContract);
                    mockProvider.addStorage(contract, slot, block, encodedSlot);
                    // check the storage twice
                    _b = expect;
                    return [4 /*yield*/, mockProvider.getStorageAt(contract, slot, block)];
                case 2:
                    // check the storage twice
                    _b.apply(void 0, [_d.sent()]).toStrictEqual(encodedSlot);
                    _c = expect;
                    return [4 /*yield*/, mockProvider.getStorageAt(contract, slot, block)];
                case 3:
                    _c.apply(void 0, [_d.sent()]).toStrictEqual(encodedSlot);
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it("should return the correct block", function () { return __awaiter(void 0, void 0, void 0, function () {
        var CASES, _i, CASES_2, block, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    CASES = [
                        { difficulty: 200, number: 25, timestamp: 31 },
                        { difficulty: 50, number: 212, timestamp: 3131 },
                        { difficulty: 4020, number: 2, timestamp: 888 },
                        { difficulty: 7, number: 1789, timestamp: 1 },
                    ];
                    _i = 0, CASES_2 = CASES;
                    _c.label = 1;
                case 1:
                    if (!(_i < CASES_2.length)) return [3 /*break*/, 5];
                    block = CASES_2[_i];
                    mockProvider.addBlock(block.number, block);
                    // check the block twice
                    _a = expect;
                    return [4 /*yield*/, mockProvider.getBlock(block.number)];
                case 2:
                    // check the block twice
                    _a.apply(void 0, [_c.sent()]).toStrictEqual(block);
                    _b = expect;
                    return [4 /*yield*/, mockProvider.getBlock(block.number)];
                case 3:
                    _b.apply(void 0, [_c.sent()]).toStrictEqual(block);
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it("should return the correct output in the calls", function () { return __awaiter(void 0, void 0, void 0, function () {
        var iface, listMatch, valueMatch, CASES, _i, CASES_3, _a, shortContract, id, inputs, outputs, block, contract, ethersContract, returnedValue;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    iface = new ethers_1.utils.Interface([
                        "function foo(uint256 val, string a, string b) external view returns (uint256 id1, uint256 id2)",
                        "function details(uint256 user_id) external view returns (string user_data)",
                        "function something(bytes _bytes) external view returns (string _string, bytes _id)",
                    ]);
                    listMatch = function (listA, listB) {
                        for (var i = 0; i < listB.length; ++i)
                            expect(listA[i].toString()).toStrictEqual(listB[i].toString());
                    };
                    valueMatch = function (value, dataList) {
                        expect(value.toString()).toStrictEqual(dataList[0].toString());
                    };
                    CASES = [
                        ["0xc0de0", "foo", [1, "a", "b"], [20, 30], 1],
                        ["0xc0de1", "foo", [1, "a", "c"], [200, 1234], 2],
                        ["0xc0de2", "something", ["0x1234"], ["a", "0xabcd"], 3],
                        ["0xc0de3", "details", [626], ["stish"], 3],
                        ["0xc0de4", "something", ["0x1234a111"], ["a", "0xabcd"], 9],
                        ["0xc0de5", "something", ["0xffffffff"], ["b", "0x20220214"], 333],
                    ];
                    _i = 0, CASES_3 = CASES;
                    _b.label = 1;
                case 1:
                    if (!(_i < CASES_3.length)) return [3 /*break*/, 5];
                    _a = CASES_3[_i], shortContract = _a[0], id = _a[1], inputs = _a[2], outputs = _a[3], block = _a[4];
                    contract = (0, utils_1.createAddress)(shortContract);
                    mockProvider.addCallTo(contract, block, iface, id, { inputs: inputs, outputs: outputs });
                    ethersContract = new ethers_1.Contract(contract, iface, mockProvider);
                    return [4 /*yield*/, ethersContract[id].apply(ethersContract, __spreadArray(__spreadArray([], inputs, false), [{ blockTag: block }], false))];
                case 2:
                    returnedValue = _b.sent();
                    if (outputs.length > 1)
                        listMatch(returnedValue, outputs);
                    else
                        valueMatch(returnedValue, outputs);
                    return [4 /*yield*/, ethersContract[id].apply(ethersContract, __spreadArray(__spreadArray([], inputs, false), [{ blockTag: block }], false))];
                case 3:
                    returnedValue = _b.sent();
                    if (outputs.length > 1)
                        listMatch(returnedValue, outputs);
                    else
                        valueMatch(returnedValue, outputs);
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it("should set the latest block", function () { return __awaiter(void 0, void 0, void 0, function () {
        var CASES, _i, CASES_4, block, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    CASES = [1, 10, 20, 9, 0, 201209];
                    _i = 0, CASES_4 = CASES;
                    _c.label = 1;
                case 1:
                    if (!(_i < CASES_4.length)) return [3 /*break*/, 5];
                    block = CASES_4[_i];
                    mockProvider.setLatestBlock(block);
                    // check the block twice
                    _a = expect;
                    return [4 /*yield*/, mockProvider.getBlockNumber()];
                case 2:
                    // check the block twice
                    _a.apply(void 0, [_c.sent()]).toStrictEqual(block);
                    _b = expect;
                    return [4 /*yield*/, mockProvider.getBlockNumber()];
                case 3:
                    _b.apply(void 0, [_c.sent()]).toStrictEqual(block);
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it.each([
        {
            filter: {
                topics: [EVENT_1_SIGHASH],
            },
            logs: [{ topics: [EVENT_1_SIGHASH] }, { topics: [EVENT_2_SIGHASH] }],
            expected: [{ topics: [EVENT_1_SIGHASH] }],
        },
        {
            filter: {
                topics: [[EVENT_1_SIGHASH]],
            },
            logs: [{ topics: [EVENT_1_SIGHASH] }, { topics: [EVENT_2_SIGHASH] }],
            expected: [{ topics: [EVENT_1_SIGHASH] }],
        },
        {
            filter: {
                topics: [[EVENT_1_SIGHASH, EVENT_2_SIGHASH]],
            },
            logs: [{ topics: [EVENT_1_SIGHASH] }, { topics: [EVENT_2_SIGHASH] }],
            expected: [{ topics: [EVENT_1_SIGHASH] }, { topics: [EVENT_2_SIGHASH] }],
        },
        {
            filter: {
                topics: [null],
            },
            logs: [
                { topics: [EVENT_1_SIGHASH, EVENT_2_SIGHASH] },
                { topics: [EVENT_1_SIGHASH] },
                { topics: [EVENT_2_SIGHASH] },
            ],
            expected: [
                { topics: [EVENT_1_SIGHASH, EVENT_2_SIGHASH] },
                { topics: [EVENT_1_SIGHASH] },
                { topics: [EVENT_2_SIGHASH] },
            ],
        },
        {
            filter: {
                address: (0, utils_1.createAddress)("0x1"),
            },
            logs: [{ address: (0, utils_1.createAddress)("0x1") }, { address: (0, utils_1.createAddress)("0x2") }],
            expected: [{ address: (0, utils_1.createAddress)("0x1") }],
        },
        {
            filter: {
                fromBlock: 2,
            },
            logs: [{ blockNumber: 1 }, { blockNumber: 2 }, { blockNumber: 3 }],
            expected: [{ blockNumber: 2 }, { blockNumber: 3 }],
        },
        {
            filter: {
                toBlock: 2,
            },
            logs: [{ blockNumber: 1 }, { blockNumber: 2 }, { blockNumber: 3 }],
            expected: [{ blockNumber: 1 }, { blockNumber: 2 }],
        },
        {
            filter: {
                fromBlock: 1,
                toBlock: 1,
            },
            logs: [{ blockNumber: 1 }, { blockNumber: 2 }, { blockNumber: 3 }],
            expected: [{ blockNumber: 1 }],
        },
        {
            filter: {
                blockHash: "0x1",
            },
            logs: [{ blockHash: "0x1" }, { blockHash: "0x1" }, { blockHash: "0x2" }],
            expected: [{ blockHash: "0x1" }, { blockHash: "0x1" }],
        },
    ])("should return the corresponding logs (case $#)", function (_a) {
        var filter = _a.filter, logs = _a.logs, expected = _a.expected;
        return __awaiter(void 0, void 0, void 0, function () {
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        mockProvider.addLogs(logs);
                        // check the logs twice
                        _b = expect;
                        return [4 /*yield*/, mockProvider.getLogs(filter)];
                    case 1:
                        // check the logs twice
                        _b.apply(void 0, [_e.sent()]).toStrictEqual(expected);
                        _c = expect;
                        return [4 /*yield*/, mockProvider.getLogs(filter)];
                    case 2:
                        _c.apply(void 0, [_e.sent()]).toStrictEqual(expected);
                        // check that the expected parameter is based on the filter object content, not reference
                        _d = expect;
                        return [4 /*yield*/, mockProvider.getLogs(__assign({}, filter))];
                    case 3:
                        // check that the expected parameter is based on the filter object content, not reference
                        _d.apply(void 0, [_e.sent()]).toStrictEqual(expected);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should return the mocked network information", function () { return __awaiter(void 0, void 0, void 0, function () {
        var networkInfo, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    networkInfo = {
                        chainId: 1,
                        ensAddress: (0, utils_1.createAddress)("0x1"),
                        name: "network",
                    };
                    mockProvider.setNetwork(networkInfo.chainId, networkInfo.ensAddress, networkInfo.name);
                    _a = expect;
                    return [4 /*yield*/, mockProvider.getNetwork()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toStrictEqual(networkInfo);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return the same signer if requested multiples times", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signers, _i, signers_1, addr, _a, signers_2, addr;
        return __generator(this, function (_b) {
            signers = [(0, utils_1.createAddress)("0x20"), (0, utils_1.createAddress)("0xdead"), (0, utils_1.createAddress)("0x5474")];
            for (_i = 0, signers_1 = signers; _i < signers_1.length; _i++) {
                addr = signers_1[_i];
                mockProvider.addSigner(addr);
                // set a value in one of the internal mocks of the signer
                mockProvider.getSigner(addr).sendTransaction.mockReturnValue("old-call-from-".concat(addr));
            }
            for (_a = 0, signers_2 = signers; _a < signers_2.length; _a++) {
                addr = signers_2[_a];
                // check the value previously set
                expect(mockProvider.getSigner(addr).sendTransaction()).toStrictEqual("old-call-from-".concat(addr));
            }
            return [2 /*return*/];
        });
    }); });
});
