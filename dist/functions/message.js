"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$message = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
exports.$message = {
    name: "$message",
    brackets: true,
    optional: true,
    type: "getter",
    fields: [
        {
            name: "arg",
            type: "number",
            required: false,
        },
    ],
    version: "1.0.0",
    default: [""],
    returns: "string",
    description: "Returns the message",
    code: (data, scope) => {
        let [arg] = data.splits;
        const currentScope = scope[scope.length - 1];
        const parsedArg = Number(arg);
        if (arg &&
            isNaN(parsedArg) &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: requires a number as an argument`);
        }
        let res = arg
            ? (0, util_1.escapeResult)(`__$DISCORD_DATA$__.args?.[${parsedArg - 1}]`)
            : (0, util_1.escapeResult)("__$DISCORD_DATA$__.args?.join(` `)");
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=message.js.map