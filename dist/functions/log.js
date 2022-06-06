"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$log = void 0;
const error_1 = require("../error");
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
    code: (data, scope) => {
        let res;
        const splits = data.splits;
        if (exports.$log.brackets) {
            if (!data.total.startsWith(exports.$log.name + "[")) {
                console.log({ t: data.total, n: exports.$log.name });
                throw new error_1.TranspilerError(`${data.name} requires closure brackets`);
            }
        }
        if (splits.length !== 1) {
            throw new error_1.TranspilerError(`${data.name} requires 1 argument`);
        }
        const text = splits[0];
        const currentScope = scope[scope.length - 1];
        if (text === "") {
            throw new error_1.TranspilerError(`${data.name} requires a text`);
        }
        const parsedText = (0, stringparser_1.parseString)(text);
        res = `${(0, util_1.escapeFunctionResult)(`console.log(${parsedText});`)}`;
        console.log({ total: data.total, res, rest: currentScope.rest });
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return { code: res, scope: scope, data };
    },
};
//# sourceMappingURL=log.js.map