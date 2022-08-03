"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$getTimestamp = void 0;
const util_1 = require("../util");
exports.$getTimestamp = {
    name: "$getTimestamp",
    brackets: false,
    optional: true,
    type: "getter",
    fields: [],
    default: [],
    version: "1.0.0",
    returns: "number",
    description: "Returns current timestamp",
    code: (data, scope) => {
        let res = (0, util_1.escapeResult)("Date.now()");
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=getTimestamp.js.map