"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$inc = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
exports.$inc = {
    name: "$inc",
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
    version: "1.0.0",
    default: ["void", "++"],
    extra: {
        example: "$increment[$get[i];++]",
    },
    returns: "void",
    description: "Increments the variable",
    code: (data, scope) => {
        const [variable, ...incrementFunction] = data.splits;
        const currentScope = scope[scope.length - 1];
        if (variable === "" &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
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
//# sourceMappingURL=inc.js.map