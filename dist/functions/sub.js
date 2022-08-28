"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sub = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
exports.$sub = {
    name: "$sub",
    type: "getter",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "numbers",
            type: "number",
            required: true,
        },
    ],
    version: "1.0.0",
    default: ["void"],
    returns: "number",
    description: "Returns the sub of the numbers",
    code: (data, scope) => {
        const numbers = data.splits;
        const currentScope = scope[scope.length - 1];
        if (data.splits.length === 0 &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name} requires at least 1 argument`);
        }
        let sub = numbers
            .map((x) => x.includes("#FUNCTION_START#") || x.includes("__$DISCORD_DATA$__") || x.includes("#MATH_FUNCTION_START#")
            ? (0, util_1.parseResult)(x.trim())
            : Number(x))
            .join("-");
        const res = (((0, util_1.escapeMathResult)(`(${sub})`)));
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope,
        };
    },
};
//# sourceMappingURL=sub.js.map