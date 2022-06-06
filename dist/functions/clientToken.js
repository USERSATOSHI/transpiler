"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$clientToken = void 0;
const util_1 = require("../util");
exports.$clientToken = {
    name: "$clientToken",
    brackets: false,
    optional: true,
    type: "getter",
    fields: [],
    code: (data, scope) => {
        let res = (0, util_1.escapeResult)("__$DISCORD_DATA$__.client.token");
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=clientToken.js.map