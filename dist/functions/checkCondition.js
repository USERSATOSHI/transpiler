"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$checkCondition = void 0;
const conditionlexer_1 = require("../conditionlexer");
const error_1 = require("../error");
const util_1 = require("../util");
exports.$checkCondition = {
    name: "$checkCondition",
    type: "getter",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "condition",
            type: "string",
            required: true,
        },
    ],
    default: ["void"],
    returns: "boolean",
    description: "Checks the condition",
    code: (data, scope) => {
        const condition = data.inside;
        const currentScope = scope[scope.length - 1];
        if (!condition) {
            throw new error_1.TranspilerError(`${data.name}: condition is required`);
        }
        const parsedCondition = (0, conditionlexer_1.conditionLexer)(condition).solve(false);
        console.log({ parsedCondition });
        const res = (0, util_1.escapeResult)((0, util_1.parseResult)(parsedCondition));
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=checkCondition.js.map