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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestTransactionEvent = void 0;
var forta_agent_1 = require("forta-agent");
var utils_1 = require("../utils");
var TestTransactionEvent = /** @class */ (function (_super) {
    __extends(TestTransactionEvent, _super);
    function TestTransactionEvent() {
        var transaction = {
            hash: "0x",
            from: (0, utils_1.createAddress)("0x0"),
            to: (0, utils_1.createAddress)("0x1"),
            nonce: 0,
            gas: "0",
            gasPrice: "0",
            value: "0",
            data: "0x",
            r: "",
            s: "",
            v: "",
        };
        var block = {};
        return _super.call(this, forta_agent_1.EventType.BLOCK, forta_agent_1.Network.MAINNET, transaction, [], {}, block, [], null) || this;
    }
    TestTransactionEvent.prototype.setHash = function (hash) {
        this.transaction.hash = hash;
        return this;
    };
    TestTransactionEvent.prototype.setFrom = function (address) {
        this.transaction.from = address.toLowerCase();
        return this;
    };
    TestTransactionEvent.prototype.setTo = function (address) {
        this.transaction.to = address.toLowerCase();
        return this;
    };
    TestTransactionEvent.prototype.setValue = function (value) {
        this.transaction.value = value;
        return this;
    };
    TestTransactionEvent.prototype.setGas = function (value) {
        this.transaction.gas = value;
        return this;
    };
    TestTransactionEvent.prototype.setGasPrice = function (value) {
        this.transaction.gasPrice = value;
        return this;
    };
    TestTransactionEvent.prototype.setData = function (data) {
        this.transaction.data = data;
        return this;
    };
    TestTransactionEvent.prototype.setGasUsed = function (value) {
        this.transaction.gas = value;
        return this;
    };
    TestTransactionEvent.prototype.setTimestamp = function (timestamp) {
        this.block.timestamp = timestamp;
        return this;
    };
    TestTransactionEvent.prototype.setBlock = function (block) {
        this.block.number = block;
        return this;
    };
    TestTransactionEvent.prototype.addEventLog = function (event, address, inputs) {
        if (address === void 0) { address = (0, utils_1.createAddress)("0x0"); }
        if (inputs === void 0) { inputs = []; }
        var iface = new forta_agent_1.ethers.utils.Interface([event]);
        var eventFragment = forta_agent_1.ethers.utils.EventFragment.from(forta_agent_1.ethers.utils.Fragment.from(event));
        var log = iface.encodeEventLog(eventFragment, inputs);
        this.logs.push({
            address: address.toLowerCase(),
            topics: log.topics,
            data: log.data,
        });
        return this;
    };
    TestTransactionEvent.prototype.addInvolvedAddresses = function () {
        var addresses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            addresses[_i] = arguments[_i];
        }
        for (var _a = 0, addresses_1 = addresses; _a < addresses_1.length; _a++) {
            var address = addresses_1[_a];
            this.addresses[address.toLowerCase()] = true;
        }
        return this;
    };
    TestTransactionEvent.prototype.addTraces = function () {
        var _a;
        var traceProps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            traceProps[_i] = arguments[_i];
        }
        var toTrace = function (props) {
            var _a, _b, _c, _d;
            if (!props.function) {
                return {
                    action: {
                        to: (_a = props.to) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
                        from: (_b = props.from) === null || _b === void 0 ? void 0 : _b.toLowerCase(),
                        value: props.value,
                    },
                };
            }
            var functionFragment = forta_agent_1.ethers.utils.FunctionFragment.from(forta_agent_1.ethers.utils.Fragment.from(props.function));
            var iface = new forta_agent_1.ethers.utils.Interface([functionFragment]);
            return {
                action: {
                    to: (_c = props.to) === null || _c === void 0 ? void 0 : _c.toLowerCase(),
                    from: (_d = props.from) === null || _d === void 0 ? void 0 : _d.toLowerCase(),
                    input: iface.encodeFunctionData(functionFragment, props.arguments),
                    value: props.value,
                },
                result: {
                    output: iface.encodeFunctionResult(functionFragment, props.output),
                },
            };
        };
        (_a = this.traces).push.apply(_a, traceProps.map(toTrace));
        return this;
    };
    return TestTransactionEvent;
}(forta_agent_1.TransactionEvent));
exports.TestTransactionEvent = TestTransactionEvent;
