"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$break = void 0;
const util_1 = require("../util");
exports.$break = {
    name: "$break",
    type: "function",
    brackets: false,
    optional: false,
    fields: [],
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const res = (0, util_1.escapeFunctionResult)(`break;`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        scope[scope.length - 1] = currentScope;
        return {
            code: res,
            scope,
        };
    },
};
//# sourceMappingURL=break.js.map