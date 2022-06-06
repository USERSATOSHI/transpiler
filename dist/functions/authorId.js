"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$authorId = void 0;
const util_1 = require("../util");
exports.$authorId = {
    name: "$authorId",
    brackets: false,
    optional: true,
    type: "getter",
    fields: [],
    code: (data, scope) => {
        let res = (0, util_1.escapeResult)("__$DISCORD_DATA$__.author?.id");
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=authorId.js.map