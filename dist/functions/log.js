"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$log = void 0;
const error_1 = require("../error");
const mathlexer_1 = __importDefault(require("../mathlexer"));
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$log = {
    name: "$log",
    brackets: true,
    optional: false,
    type: "function",
    fields: [
        {
            name: "text",
            type: "string",
            required: true,
        },
    ],
    version: "1.0.0",
    default: ["void"],
    returns: "void",
    description: "Logs the text",
    code: (data, scope) => {
        let res;
        const splits = data.splits;
        const currentScope = scope[scope.length - 1];
        if (exports.$log.brackets) {
            if (!data.total.startsWith(exports.$log.name + "[") &&
                (!currentScope.name.startsWith("$try_") ||
                    !currentScope.name.startsWith("$catch_"))) {
                throw new error_1.TranspilerError(`${data.name} requires closure brackets`);
            }
        }
        if (splits.length !== 1 &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name} requires 1 argument`);
        }
        const text = splits[0];
        if (text === "" &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name} requires a text`);
        }
        const parsedText = (0, stringparser_1.parseString)((0, mathlexer_1.default)(text));
        res = `${(0, util_1.escapeFunctionResult)(`console.log(${parsedText});`)}`;
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return { code: res, scope: scope, data };
    },
};
//# sourceMappingURL=log.js.map