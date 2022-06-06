"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$increment = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
exports.$increment = {
    name: "$increment",
    type: "function",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "variable",
            type: "string",
            required: true,
        },
        {
            name: "incrementFunction",
            type: "function",
            required: false,
        },
    ],
    code: (data, scope) => {
        const [variable, ...incrementFunction] = data.splits;
        const currentScope = scope[scope.length - 1];
        if (variable === "") {
            throw new error_1.TranspilerError(`${data.name} requires a variable`);
        }
        if (incrementFunction.length === 0) {
            incrementFunction.push("++");
        }
        const incrementFunctionString = incrementFunction.join(";");
        const res = (0, util_1.escapeFunctionResult)(`${variable}${incrementFunctionString};`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=increment.js.map