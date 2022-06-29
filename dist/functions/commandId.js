"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$commandId = void 0;
const util_1 = require("../util");
exports.$commandId = {
    name: "$commandId",
    type: "getter",
    brackets: false,
    optional: false,
    version: "1.0.0",
    fields: [],
    default: [],
    returns: "Snowflake",
    description: "Returns the command's ID",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const res = (0, util_1.escapeResult)(`__$DISCORD_DATA$__.interaction.commandId`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=commandId.js.map