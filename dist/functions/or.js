"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$or = void 0;
const conditionlexer_1 = require("../conditionlexer");
const util_1 = require("../util");
exports.$or = {
    name: "$or",
    type: "getter",
    brackets: true,
    optional: false,
    version: "1.0.0",
    fields: [
        {
            name: "condition",
            type: "string",
            required: true,
        },
    ],
    default: ["void"],
    returns: "boolean",
    description: "Returns true if any conditions are true",
    code: (data, scope) => {
        const conditions = data.splits;
        const currentScope = scope[scope.length - 1];
        const solved = (0, conditionlexer_1.conditionLexer)(conditions.join("||")).solve(false);
        const res = (0, util_1.escapeResult)(solved);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope,
        };
    },
};
//# sourceMappingURL=or.js.map