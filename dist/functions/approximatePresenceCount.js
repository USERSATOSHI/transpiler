"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$approximatePresenceCount = void 0;
const util_1 = require("../util");
exports.$approximatePresenceCount = {
    name: "$approximatePresenceCount ",
    brackets: true,
    optional: true,
    type: "getter",
    fields: [
        {
            name: "guildId",
            type: "Snowflake",
            required: false,
        },
    ],
    description: "returns approx presence count for provided guildId",
    default: ["__$DISCORD_DATA$__.guild?.id"],
    returns: "number | null",
    version: "1.0.0",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const guildId = data.inside;
        const res = (0, util_1.escapeResult)(guildId
            ? `__$DISCORD_DATA$__.client.guilds.cache.get(${guildId})?.approxMemberCount`
            : `__$DISCORD_DATA$__.guild?.approxMemberCount`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=approximatePresenceCount.js.map