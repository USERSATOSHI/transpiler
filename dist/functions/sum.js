"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sum = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
exports.$sum = {
    name: "$sum",
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
    default: ["void"],
    returns: "number",
    description: "Returns the sum of the numbers",
    code: (data, scope) => {
        const numbers = data.splits;
        const currentScope = scope[scope.length - 1];
        if (data.splits.length === 0 &&
            (!currentScope.name.startsWith("$try_") &&
                !currentScope.name.startsWith("$catch_"))) {
            throw new error_1.TranspilerError(`${data.name} requires at least 1 argument`);
        }
        let sum = `${numbers.map((x) => x.startsWith("#FUNCTION_START#") || x.startsWith("__$DISCORD_DATA$__") ? x : Number(x)).join("+")}`;
        const res = (0, util_1.escapeResult)(sum);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope,
        };
    },
};
//# sourceMappingURL=sum.js.map