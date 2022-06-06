"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$guildId = void 0;
const util_1 = require("../util");
exports.$guildId = {
    name: "$guildId",
    brackets: true,
    optional: true,
    type: "getter",
    fields: [
        {
            name: "guildName",
            type: "string",
            required: true,
        },
    ],
    code: (data, scope) => {
        const guildName = data.inside;
        let res = guildName
            ? (0, util_1.escapeResult)(`__$DISCORD_DATA$__.client.guilds.cache.find(x => x.name === \`${guildName}\`)?.id`)
            : (0, util_1.escapeResult)("__$DISCORD_DATA$__.guild?.id");
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=guildId.js.map