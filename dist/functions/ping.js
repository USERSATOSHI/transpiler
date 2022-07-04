"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ping = void 0;
const util_1 = require("../util");
exports.$ping = {
    name: "$ping",
    brackets: false,
    optional: true,
    type: "getter",
    fields: [],
    default: [],
    returns: "number",
    description: "Returns the bot's ping",
    version: "1.0.0",
    code: (data, scope) => {
        const res = (0, util_1.escapeResult)("__$DISCORD_DATA$__.client.ws.ping");
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
            data,
        };
    },
};
//# sourceMappingURL=ping.js.map