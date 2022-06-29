"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$activity = void 0;
const util_1 = require("../util");
exports.$activity = {
    name: "$activity",
    brackets: true,
    optional: true,
    type: "getter",
    fields: [
        {
            name: "userId",
            type: "string",
            required: false,
        },
        {
            name: "guildId",
            type: "string",
            required: false,
        },
        {
            name: "separator",
            type: "string",
            required: false,
        },
    ],
    version: "1.0.0",
    description: "Returns the activity of provided user",
    default: ["__$DISCORD_DATA$__.author?.id", "__$DISCORD_DATA$__.guild?.id", ","],
    returns: "string",
    code: (data, scope) => {
        const splits = data.splits;
        const [userId = (0, util_1.escapeResult)("__$DISCORD_DATA$__.author?.id"), guildId = (0, util_1.escapeResult)("__$DISCORD_DATA$__.guild?.id"), separator = ",",] = splits;
        const currentScope = scope[scope.length - 1];
        const reg = /((#FUNCTION_START#([\s$a-z.0-9?(){}\[\]._:'"`;=><,!-]|\n)+#FUNCTION_END#)|(__\$[a-z_?.()]+\$__))/gim;
        ;
        let res = (0, util_1.escapeResult)(`__$DISCORD_DATA$__.client.guilds.cache.get(\`${guildId}\`)?.members.cache.get(\`${userId}\`)?.presence.activities.join(\`${separator}\`) ?? "None"`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return { code: res, scope: scope };
    },
};
//# sourceMappingURL=activity.js.map