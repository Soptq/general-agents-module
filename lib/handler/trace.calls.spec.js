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
var trace_calls_1 = __importDefault(require("./trace.calls"));
describe("Function calls detector Agent Tests", function () {
    var handleTransaction;
    it("should return empty findings if the expected function wasn't called", function () { return __awaiter(void 0, void 0, void 0, function () {
        var traceCalls, txEvent, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: ["function func()"],
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    txEvent = new test_1.TestTransactionEvent();
                    return [4 /*yield*/, handleTransaction(txEvent)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not break if no trace is passed", function () { return __awaiter(void 0, void 0, void 0, function () {
        var traceCalls, txEvent, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: ["function func()"],
                        to: (0, utils_1.createAddress)("0x0"),
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    txEvent = {
                        addresses: { "0x": true },
                    };
                    return [4 /*yield*/, handleTransaction(txEvent)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return findings only if the trace satisfies the `includeError` condition", function () { return __awaiter(void 0, void 0, void 0, function () {
        var traceCalls, txEvent1, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: ["function func()"],
                        includeErrors: true,
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    txEvent1 = new test_1.TestTransactionEvent().addTraces({ function: "function func()" });
                    txEvent1.traces[0].error = "error";
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent1)]);
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: ["function func()"],
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 2:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return findings only if the function is called in the contract target `to`", function () { return __awaiter(void 0, void 0, void 0, function () {
        var traceCalls, txEvent1, findings, txEvent2, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: ["function func()"],
                        to: (0, utils_1.createAddress)("0x0"),
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    txEvent1 = new test_1.TestTransactionEvent().addTraces({
                        function: "function func()",
                        to: (0, utils_1.createAddress)("0x1"),
                    });
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 1:
                    findings = _c.sent();
                    expect(findings).toStrictEqual([]);
                    txEvent2 = new test_1.TestTransactionEvent().addTraces({
                        function: "function func()",
                        to: (0, utils_1.createAddress)("0x0"),
                    });
                    _b = (_a = findings).concat;
                    return [4 /*yield*/, handleTransaction(txEvent2)];
                case 2:
                    findings = _b.apply(_a, [_c.sent()]);
                    expect(findings).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent2)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return findings only if the function is called from the caller target `from`", function () { return __awaiter(void 0, void 0, void 0, function () {
        var traceCalls, txEvent1, findings, txEvent2, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: ["function func()"],
                        from: (0, utils_1.createAddress)("0x0"),
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    txEvent1 = new test_1.TestTransactionEvent().addTraces({
                        function: "function func()",
                        from: (0, utils_1.createAddress)("0x1"),
                    });
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 1:
                    findings = _c.sent();
                    expect(findings).toStrictEqual([]);
                    txEvent2 = new test_1.TestTransactionEvent().addTraces({
                        function: "function func()",
                        from: (0, utils_1.createAddress)("0x0"),
                    });
                    _b = (_a = findings).concat;
                    return [4 /*yield*/, handleTransaction(txEvent2)];
                case 2:
                    findings = _b.apply(_a, [_c.sent()]);
                    expect(findings).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent2)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return a finding only if all the conditions are met", function () { return __awaiter(void 0, void 0, void 0, function () {
        var traceCalls, txEvent1, findings, txEvent2, _a, _b, txEvent3, _c, _d, txEvent4, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: ["function func()"],
                        from: (0, utils_1.createAddress)("0x1"),
                        to: (0, utils_1.createAddress)("0x2"),
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    txEvent1 = new test_1.TestTransactionEvent().addTraces({
                        function: "function func()",
                        from: (0, utils_1.createAddress)("0x0"),
                        to: (0, utils_1.createAddress)("0x2"),
                    });
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 1:
                    findings = _g.sent();
                    expect(findings).toStrictEqual([]);
                    txEvent2 = new test_1.TestTransactionEvent().addTraces({
                        function: "function func()",
                        from: (0, utils_1.createAddress)("0x1"),
                        to: (0, utils_1.createAddress)("0x0"),
                    });
                    _b = (_a = findings).concat;
                    return [4 /*yield*/, handleTransaction(txEvent2)];
                case 2:
                    findings = _b.apply(_a, [_g.sent()]);
                    expect(findings).toStrictEqual([]);
                    txEvent3 = new test_1.TestTransactionEvent().addTraces({
                        function: "function func()",
                        from: (0, utils_1.createAddress)("0x0"),
                        to: (0, utils_1.createAddress)("0x3"),
                    });
                    _d = (_c = findings).concat;
                    return [4 /*yield*/, handleTransaction(txEvent3)];
                case 3:
                    findings = _d.apply(_c, [_g.sent()]);
                    expect(findings).toStrictEqual([]);
                    txEvent4 = new test_1.TestTransactionEvent().addTraces({
                        function: "function func()",
                        from: (0, utils_1.createAddress)("0x1"),
                        to: (0, utils_1.createAddress)("0x2"),
                    });
                    _f = (_e = findings).concat;
                    return [4 /*yield*/, handleTransaction(txEvent4)];
                case 4:
                    findings = _f.apply(_e, [_g.sent()]);
                    expect(findings).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent4)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should pass correct metadata to onFinding", function () { return __awaiter(void 0, void 0, void 0, function () {
        var functionDefinition, args, to, from, output, traceCalls, txEvent, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    functionDefinition = "function myMethod(uint256 myNumber, string myString) returns (uint256, address)";
                    args = ["0x2345675643", "Hello!"];
                    to = (0, utils_1.createAddress)("0x1");
                    from = (0, utils_1.createAddress)("0x2");
                    output = ["0x20", (0, utils_1.createAddress)("0x1")];
                    traceCalls = new trace_calls_1.default({
                        onFinding: function (metadata) {
                            return forta_agent_1.Finding.fromObject({
                                name: "Test Name",
                                description: "Test Description",
                                alertId: "Test Id",
                                severity: forta_agent_1.FindingSeverity.Medium,
                                type: forta_agent_1.FindingType.Suspicious,
                                metadata: {
                                    from: metadata === null || metadata === void 0 ? void 0 : metadata.from,
                                    to: metadata === null || metadata === void 0 ? void 0 : metadata.to,
                                    selector: metadata === null || metadata === void 0 ? void 0 : metadata.sighash,
                                    arguments: metadata === null || metadata === void 0 ? void 0 : metadata.args,
                                    output: metadata === null || metadata === void 0 ? void 0 : metadata.output,
                                },
                            });
                        },
                        signatures: [functionDefinition],
                        to: to,
                        from: from,
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    txEvent = new test_1.TestTransactionEvent().addTraces({
                        function: functionDefinition,
                        from: from,
                        to: to,
                        arguments: args,
                        output: output,
                    });
                    return [4 /*yield*/, handleTransaction(txEvent)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toHaveLength(1);
                    expect(findings[0]).toHaveProperty("metadata.from", from);
                    expect(findings[0]).toHaveProperty("metadata.to", to);
                    expect(findings[0]).toHaveProperty("metadata.selector", "0x24ee0097"); // keccak256("myMethod(uint256,string)")[0..3]
                    expect(findings[0]).toHaveProperty("metadata.arguments.0._hex", args[0]);
                    expect(findings[0]).toHaveProperty("metadata.arguments.1", args[1]);
                    expect(findings[0]).toHaveProperty("metadata.output.0._hex", output[0]);
                    expect(findings[0]).toHaveProperty("metadata.output.1", output[1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return findings only if calls fits with filterByArguments condition", function () { return __awaiter(void 0, void 0, void 0, function () {
        var functionDefinition, to, from, filterByArguments, traceCalls, args1, txEvent1, findings1, args2, txEvent2, findings2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    functionDefinition = "function myMethod(uint256 myNumber, string myString)";
                    to = (0, utils_1.createAddress)("0x1");
                    from = (0, utils_1.createAddress)("0x2");
                    filterByArguments = function (_a) {
                        var myString = _a.myString;
                        return myString === "Hello!";
                    };
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: [functionDefinition],
                        from: from,
                        to: to,
                        filterByArguments: filterByArguments,
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    args1 = ["2345675643", "Hello!"];
                    txEvent1 = new test_1.TestTransactionEvent().addTraces({
                        function: functionDefinition,
                        from: from,
                        to: to,
                        arguments: args1,
                    });
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 1:
                    findings1 = _a.sent();
                    expect(findings1).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent1)]);
                    args2 = ["2345675643", "Goodbye!"];
                    txEvent2 = new test_1.TestTransactionEvent().addTraces({
                        function: functionDefinition,
                        from: from,
                        to: to,
                        arguments: args2,
                    });
                    return [4 /*yield*/, handleTransaction(txEvent2)];
                case 2:
                    findings2 = _a.sent();
                    expect(findings2).toStrictEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return findings only if calls fits with filterByArguments condition, specifying function with fragment", function () { return __awaiter(void 0, void 0, void 0, function () {
        var functionDefinition, to, from, filterByArguments, traceCalls, args1, txEvent1, findings1, args2, txEvent2, findings2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    functionDefinition = "function myMethod(uint256 myNumber, string myString)";
                    to = (0, utils_1.createAddress)("0x1");
                    from = (0, utils_1.createAddress)("0x2");
                    filterByArguments = function (_a) {
                        var myString = _a.myString;
                        return myString === "Hello!";
                    };
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: [forta_agent_1.ethers.utils.Fragment.from(functionDefinition).format("full")],
                        from: from,
                        to: to,
                        filterByArguments: filterByArguments,
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    args1 = ["2345675643", "Hello!"];
                    txEvent1 = new test_1.TestTransactionEvent().addTraces({
                        function: functionDefinition,
                        from: from,
                        to: to,
                        arguments: args1,
                    });
                    return [4 /*yield*/, handleTransaction(txEvent1)];
                case 1:
                    findings1 = _a.sent();
                    expect(findings1).toStrictEqual([(0, test_1.generalTestFindingGenerator)(txEvent1)]);
                    args2 = ["2345675643", "Goodbye!"];
                    txEvent2 = new test_1.TestTransactionEvent().addTraces({
                        function: functionDefinition,
                        from: from,
                        to: to,
                        arguments: args2,
                    });
                    return [4 /*yield*/, handleTransaction(txEvent2)];
                case 2:
                    findings2 = _a.sent();
                    expect(findings2).toStrictEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return empty finding if other function is called", function () { return __awaiter(void 0, void 0, void 0, function () {
        var functionDefinition, to, from, filterByArguments, traceCalls, txEvent, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    functionDefinition = "function otherMethod()";
                    to = (0, utils_1.createAddress)("0x1");
                    from = (0, utils_1.createAddress)("0x2");
                    filterByArguments = function (args) {
                        return args[1] === "Hello!";
                    };
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: ["function myMethod(uint256,string)"],
                        to: to,
                        from: from,
                        filterByArguments: filterByArguments,
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    txEvent = new test_1.TestTransactionEvent().addTraces({
                        function: functionDefinition,
                        from: from,
                        to: to,
                    });
                    return [4 /*yield*/, handleTransaction(txEvent)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return findings only if calls fits with filterByOutput condition", function () { return __awaiter(void 0, void 0, void 0, function () {
        var functionDefinition, filterByOutput, traceCalls, txEvent, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    functionDefinition = "function myMethodWithOutput() returns (uint256 value)";
                    filterByOutput = function (output) {
                        return output && output.value.gte(3);
                    };
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: [functionDefinition],
                        filterByOutput: filterByOutput,
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    txEvent = new test_1.TestTransactionEvent().addTraces({ function: functionDefinition, output: [2] }, { function: functionDefinition, output: [3] }, { function: functionDefinition, output: [1] }, { function: functionDefinition, output: [10] });
                    return [4 /*yield*/, handleTransaction(txEvent)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([(0, test_1.generalTestFindingGenerator)(), (0, test_1.generalTestFindingGenerator)()]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return findings only if calls fits with filter condition", function () { return __awaiter(void 0, void 0, void 0, function () {
        var functionDefinition, filter, traceCalls, txEvent, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    functionDefinition = "function myMethodWithOutput() returns (uint256 value)";
                    filter = function (call) {
                        return call.output ? call.output[0].lte(3) : false;
                    };
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: [functionDefinition],
                        filter: filter,
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    txEvent = new test_1.TestTransactionEvent().addTraces({ function: functionDefinition, output: [2] }, { function: functionDefinition, output: [3] }, { function: functionDefinition, output: [1] }, { function: functionDefinition, output: [10] });
                    return [4 /*yield*/, handleTransaction(txEvent)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([
                        (0, test_1.generalTestFindingGenerator)(),
                        (0, test_1.generalTestFindingGenerator)(),
                        (0, test_1.generalTestFindingGenerator)(),
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should filter by selector if other options are undefined", function () { return __awaiter(void 0, void 0, void 0, function () {
        var functionDefinition, traceCalls, txEvent, findings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    functionDefinition = "function myMethodWithOutput() returns (uint256 value)";
                    traceCalls = new trace_calls_1.default({
                        onFinding: test_1.generalTestFindingGenerator,
                        signatures: [functionDefinition],
                    });
                    handleTransaction = traceCalls.getHandleTransaction();
                    txEvent = new test_1.TestTransactionEvent().addTraces({ function: functionDefinition, output: [0] }, { function: "function wrongSelector()" });
                    return [4 /*yield*/, handleTransaction(txEvent)];
                case 1:
                    findings = _a.sent();
                    expect(findings).toStrictEqual([(0, test_1.generalTestFindingGenerator)()]);
                    return [2 /*return*/];
            }
        });
    }); });
});
