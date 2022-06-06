"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$clientId = void 0;
const util_1 = require("../util");
exports.$clientId = {
    name: "$clientId",
    brackets: false,
    optional: true,
    type: "getter",
    fields: [],
    code: (data, scope) => {
        let res = (0, util_1.escapeResult)("__$DISCORD_DATA$__.client.user?.id");
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=clientId.js.map