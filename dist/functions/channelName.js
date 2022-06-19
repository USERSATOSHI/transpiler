"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$channelName = void 0;
const util_1 = require("../util");
exports.$channelName = {
    name: "$channelName",
    brackets: false,
    optional: true,
    type: "getter",
    fields: [
        {
            name: "channelId",
            type: "Snowflake",
            required: true,
        },
    ],
    default: [""],
    returns: "string",
    description: "Returns the channel's name",
    code: (data, scope) => {
        const id = data.inside;
        let res = id
            ? (0, util_1.escapeResult)(`__$DISCORD_DATA$__.client.channels.cache.get(\`${id}\`)?.name`)
            : (0, util_1.escapeResult)("__$DISCORD_DATA$__.channel?.name");
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=channelName.js.map