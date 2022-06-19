"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$customId = void 0;
const util_1 = require("../util");
exports.$customId = {
    name: "$customId",
    type: "getter",
    brackets: false,
    optional: false,
    fields: [],
    default: [],
    returns: "Snowflake",
    description: "Returns the custom ID",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const res = (0, util_1.escapeResult)(`__$DISCORD_DATA$__.interaction.customId`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=customId.js.map