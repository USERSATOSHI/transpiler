"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$commandName = void 0;
const util_1 = require("../util");
exports.$commandName = {
    name: "$commandName",
    type: "getter",
    brackets: false,
    optional: false,
    fields: [],
    default: [],
    returns: "string",
    description: "Returns the command's name",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const res = (0, util_1.escapeResult)(`__$DISCORD_DATA$__.interaction.commandName`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=commandName.js.map