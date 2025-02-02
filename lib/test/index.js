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
exports.MockEthersSigner = exports.MockEthersProvider = exports.TestBlockEvent = exports.TestTransactionEvent = exports.generalTestFindingGenerator = exports.runBlock = void 0;
var test_transaction_event_1 = require("./test_transaction_event");
Object.defineProperty(exports, "TestTransactionEvent", { enumerable: true, get: function () { return test_transaction_event_1.TestTransactionEvent; } });
var test_block_event_1 = require("./test_block_event");
Object.defineProperty(exports, "TestBlockEvent", { enumerable: true, get: function () { return test_block_event_1.TestBlockEvent; } });
var mock_ethers_provider_1 = __importDefault(require("./mock_ethers_provider"));
exports.MockEthersProvider = mock_ethers_provider_1.default;
var mock_ethers_signer_1 = __importDefault(require("./mock_ethers_signer"));
exports.MockEthersSigner = mock_ethers_signer_1.default;
var forta_agent_1 = require("forta-agent");
var runBlock = function (bot, block) {
    var txns = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        txns[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var findings, _a, _b, _c, _d, txns_1, tx, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    findings = [];
                    _b = (_a = findings.push).apply;
                    _c = [findings];
                    return [4 /*yield*/, bot.handleBlock(block)];
                case 1:
                    _b.apply(_a, _c.concat([(_h.sent())]));
                    _d = 0, txns_1 = txns;
                    _h.label = 2;
                case 2:
                    if (!(_d < txns_1.length)) return [3 /*break*/, 5];
                    tx = txns_1[_d];
                    _f = (_e = findings.push).apply;
                    _g = [findings];
                    return [4 /*yield*/, bot.handleTransaction(tx)];
                case 3:
                    _f.apply(_e, _g.concat([(_h.sent())]));
                    _h.label = 4;
                case 4:
                    _d++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, findings];
            }
        });
    });
};
exports.runBlock = runBlock;
var generalTestFindingGenerator = function () {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
    return forta_agent_1.Finding.fromObject({
        name: "Finding Test",
        description: "Finding for test",
        alertId: "TEST",
        severity: forta_agent_1.FindingSeverity.Low,
        type: forta_agent_1.FindingType.Info,
    });
};
exports.generalTestFindingGenerator = generalTestFindingGenerator;
