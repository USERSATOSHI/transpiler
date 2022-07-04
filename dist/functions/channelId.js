"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$channelId = void 0;
const util_1 = require("../util");
exports.$channelId = {
    name: "$channelId",
    brackets: true,
    optional: true,
    type: "getter",
    fields: [
        {
            name: "channel",
            type: "string",
            required: true,
        },
    ],
    version: "1.0.0",
    default: [""],
    returns: "Snowflake",
    description: "Returns the channel's ID",
    code: (data, scope) => {
        const channelName = data.inside;
        let res = channelName
            ? (0, util_1.escapeResult)(`__$DISCORD_DATA$__.client.channels.cache.find(x => x.name === \`${channelName}\`)?.id`)
            : (0, util_1.escapeResult)("__$DISCORD_DATA$__.channel?.id");
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=channelId.js.map