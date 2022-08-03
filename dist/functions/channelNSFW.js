"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$channelNSFW = void 0;
const util_1 = require("../util");
exports.$channelNSFW = {
    name: "$channelNSFW",
    brackets: false,
    optional: true,
    type: "getter",
    version: "1.0.0",
    fields: [
        {
            name: "channelId",
            type: "Snowflake",
            required: true,
        },
    ],
    default: ["__$DISCORD_DATA$__.channel?.id"],
    returns: "boolean",
    description: "Returns whether channel is NSFW or not",
    code: (data, scope) => {
        const id = data.inside;
        let res = id
            ? (0, util_1.escapeResult)(`__$DISCORD_DATA$__.client.channels.cache.get(\`${id}\`)?.nsfw`)
            : (0, util_1.escapeResult)("__$DISCORD_DATA$__.channel?.name");
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=channelNSFW.js.map