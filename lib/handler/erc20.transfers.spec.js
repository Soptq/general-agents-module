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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var forta_agent_1 = require("forta-agent");
var test_1 = require("../test");
var utils_1 = require("../utils");
var erc20_transfers_1 = __importDefault(require("./erc20.transfers"));
var TOKEN_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
var createTransactionEventWithTransferLog = function (tokenAddress, from, to, amount) {
    return new test_1.TestTransactionEvent().addEventLog("event Transfer(address indexed from, address indexed to, uint256 amount)", tokenAddress, [from, to, amount]);
};
describe("ERC20 Transfer Agent Tests", function () {
    var handleTransaction;
    it("should return empty findings if the expected event wasn't emitted", function () { return __awaiter(void 0, void 0, void 0, function () {
        var handler, txEvent, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler = new erc20_transfers_1.default({
                        emitter: TOKEN_ADDRESS,
                        onFinding: test_1.generalTestFindingGenerator,
                    });
                    handleTransaction = handler.getHandleTransaction();
                    txEvent = new test_1.TestTransactionEvent().addEventLog("event BadSignature()", TOKEN_ADDRESS);
                    return [4 /*yield*/, handleTransaction(txEvent)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return empty findings if the expected event wasn't emitted from the correct token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var handler, txEvent, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler = new erc20_transfers_1.default({
                        emitter: TOKEN_ADDRESS,
                        onFinding: test_1.generalTestFindingGenerator,
                    });
                    handleTransaction = handler.getHandleTransaction();
                    txEvent = createTransactionEventWithTransferLog("0x0", (0, utils_1.createAddress)("0x0"), (0, utils_1.createAddress)("0x0"), "0");
                    return [4 /*yield*/, handleTransaction(txEvent)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return a finding only if the expected event was emitted from the correct token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var handler, txEvent, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler = new erc20_transfers_1.default({
                        emitter: TOKEN_ADDRESS,
                        onFinding: test_1.generalTestFindingGenerator,
                    });
                    handleTransaction = handler.getHandleTransaction();
                    txEvent = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x0"), (0, utils_1.createAddress)("0x0"), "0");
                    return [4 /*yield*/, handleTransaction(txEvent)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return a finding only if the event has in the field `to` the correct address", function () { return __awaiter(void 0, void 0, void 0, function () {
        var handler, txEvent1, findings, txEvent2, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    handler = new erc20_transfers_1.default({
                        emitter: TOKEN_ADDRESS,
                        to: (0, utils_1.createAddress)("0x12"),
                        onFinding: test_1.generalTestFindingGenerator,
                    });
                    handleTransaction = handler.getHandleTransaction();
                    txEvent1 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x0"), (0, utils_1.createAddress)("0x0"), "0");
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 1:
                    findings = _c.sent();
                    expect(findings).toStrictEqual([]);
                    txEvent2 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x0"), (0, utils_1.createAddress)("0x12"), "0");
                    _b = (_a = findings).concat;
                    return [4 /*yield*/, handleTransaction(txEvent2)];
                case 2:
                    findings = _b.apply(_a, [_c.sent()]);
                    expect(findings).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent2)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return a finding only if the event has in the field `from` the correct address", function () { return __awaiter(void 0, void 0, void 0, function () {
        var handler, txEvent1, findings, txEvent2, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    handler = new erc20_transfers_1.default({
                        emitter: TOKEN_ADDRESS,
                        from: (0, utils_1.createAddress)("0x12"),
                        onFinding: test_1.generalTestFindingGenerator,
                    });
                    handleTransaction = handler.getHandleTransaction();
                    txEvent1 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x0"), (0, utils_1.createAddress)("0x0"), "0");
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 1:
                    findings = _c.sent();
                    expect(findings).toStrictEqual([]);
                    txEvent2 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x12"), (0, utils_1.createAddress)("0x0"), "0");
                    _b = (_a = findings).concat;
                    return [4 /*yield*/, handleTransaction(txEvent2)];
                case 2:
                    findings = _b.apply(_a, [_c.sent()]);
                    expect(findings).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent2)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return a finding only if the event has in the field `amount` an amount greater than the specified threshold", function () { return __awaiter(void 0, void 0, void 0, function () {
        var handler, txEvent1, findings, txEvent2, _a, _b, txEvent3, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    handler = new erc20_transfers_1.default({
                        emitter: TOKEN_ADDRESS,
                        amountThreshold: "350",
                        onFinding: test_1.generalTestFindingGenerator,
                    });
                    handleTransaction = handler.getHandleTransaction();
                    txEvent1 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x0"), (0, utils_1.createAddress)("0x0"), "300");
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 1:
                    findings = _e.sent();
                    expect(findings).toStrictEqual([]);
                    txEvent2 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x12"), (0, utils_1.createAddress)("0x0"), "350");
                    _b = (_a = findings).concat;
                    return [4 /*yield*/, handleTransaction(txEvent2)];
                case 2:
                    findings = _b.apply(_a, [_e.sent()]);
                    expect(findings).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent2)]);
                    txEvent3 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x12"), (0, utils_1.createAddress)("0x0"), "360");
                    _d = (_c = findings).concat;
                    return [4 /*yield*/, handleTransaction(txEvent2)];
                case 3:
                    findings = _d.apply(_c, [_e.sent()]);
                    expect(findings).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent2), (0, test_1.generalTestFindingGenerator)(txEvent3)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return a finding only if the event has the field `amount` satisfies the specified threshold callback", function () { return __awaiter(void 0, void 0, void 0, function () {
        var handler, txEvent1, findings1, txEvent2, findings2, txEvent3, findings3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler = new erc20_transfers_1.default({
                        emitter: TOKEN_ADDRESS,
                        amountThreshold: function (amount) {
                            return amount.gt("10") && amount.lt("100");
                        },
                        onFinding: test_1.generalTestFindingGenerator,
                    });
                    handleTransaction = handler.getHandleTransaction();
                    txEvent1 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x0"), (0, utils_1.createAddress)("0x0"), "10");
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 1:
                    findings1 = _a.sent();
                    expect(findings1).toStrictEqual([]);
                    txEvent2 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x0"), (0, utils_1.createAddress)("0x0"), "50");
                    return [4 /*yield*/, handleTransaction(txEvent2)];
                case 2:
                    findings2 = _a.sent();
                    expect(findings2).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent2)]);
                    txEvent3 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x12"), (0, utils_1.createAddress)("0x0"), "101");
                    return [4 /*yield*/, handleTransaction(txEvent3)];
                case 3:
                    findings3 = _a.sent();
                    expect(findings3).toStrictEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not compare thresholds using lexicographic order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var handler, txEvent1, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler = new erc20_transfers_1.default({
                        emitter: TOKEN_ADDRESS,
                        onFinding: test_1.generalTestFindingGenerator,
                        amountThreshold: "10",
                    });
                    handleTransaction = handler.getHandleTransaction();
                    txEvent1 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x0"), (0, utils_1.createAddress)("0x0"), "2");
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return a finding only if all the conditions are met", function () { return __awaiter(void 0, void 0, void 0, function () {
        var handler, txEvent1, findings, txEvent2, _a, _b, txEvent3, _c, _d, txEvent4, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    handler = new erc20_transfers_1.default({
                        emitter: TOKEN_ADDRESS,
                        from: (0, utils_1.createAddress)("0x1"),
                        to: (0, utils_1.createAddress)("0x2"),
                        amountThreshold: "350",
                        onFinding: test_1.generalTestFindingGenerator,
                    });
                    handleTransaction = handler.getHandleTransaction();
                    txEvent1 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x1"), (0, utils_1.createAddress)("0x2"), "300");
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 1:
                    findings = _g.sent();
                    expect(findings).toStrictEqual([]);
                    txEvent2 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x1"), (0, utils_1.createAddress)("0x0"), "350");
                    _b = (_a = findings).concat;
                    return [4 /*yield*/, handleTransaction(txEvent2)];
                case 2:
                    findings = _b.apply(_a, [_g.sent()]);
                    expect(findings).toStrictEqual([]);
                    txEvent3 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x3"), (0, utils_1.createAddress)("0x2"), "360");
                    _d = (_c = findings).concat;
                    return [4 /*yield*/, handleTransaction(txEvent3)];
                case 3:
                    findings = _d.apply(_c, [_g.sent()]);
                    expect(findings).toStrictEqual([]);
                    txEvent4 = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x1"), (0, utils_1.createAddress)("0x2"), "360");
                    _f = (_e = findings).concat;
                    return [4 /*yield*/, handleTransaction(txEvent4)];
                case 4:
                    findings = _f.apply(_e, [_g.sent()]);
                    expect(findings).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent4)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should pass correct metadata to findingGenerator", function () { return __awaiter(void 0, void 0, void 0, function () {
        var onFinding, handler, txEvent, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onFinding = function (metadata) {
                        return forta_agent_1.Finding.fromObject({
                            name: "testName",
                            description: "testDescription",
                            alertId: "testId",
                            severity: forta_agent_1.FindingSeverity.Medium,
                            type: forta_agent_1.FindingType.Suspicious,
                            metadata: {
                                from: metadata.from,
                                to: metadata.to,
                                amount: metadata.amount.toString(),
                            },
                        });
                    };
                    handler = new erc20_transfers_1.default({
                        emitter: TOKEN_ADDRESS,
                        onFinding: onFinding,
                    });
                    handleTransaction = handler.getHandleTransaction();
                    txEvent = createTransactionEventWithTransferLog(TOKEN_ADDRESS, (0, utils_1.createAddress)("0x1"), (0, utils_1.createAddress)("0x2"), "300");
                    return [4 /*yield*/, handleTransaction(txEvent)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([
                        onFinding({
                            emitter: TOKEN_ADDRESS,
                            from: (0, utils_1.createAddress)("0x1"),
                            to: (0, utils_1.createAddress)("0x2"),
                            amount: forta_agent_1.ethers.BigNumber.from("300"),
                        }),
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
});
