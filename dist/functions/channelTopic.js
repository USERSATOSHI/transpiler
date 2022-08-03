"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$channelTopic = void 0;
const util_1 = require("../util");
exports.$channelTopic = {
    name: "$channelTopic",
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
    description: "Returns the channel's Topic",
    code: (data, scope) => {
        const id = data.inside;
        let res = id
            ? (0, util_1.escapeResult)(`__$DISCORD_DATA$__.client.channels.cache.get(\`${id}\`)?.topic`)
            : (0, util_1.escapeResult)("__$DISCORD_DATA$__.channel?.name");
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=channelTopic.js.map