"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isServerPremiumProgressBarEnabled = void 0;
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$isServerPremiumProgressBarEnabled = {
    name: "$isServerPremiumProgressBarEnabled",
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
    version: "1.0.0",
    default: ["__$DISCORD_DATA$__.guild?.id"],
    returns: "boolean",
    description: "Checks if the server has premium progress bar enabled",
    code: (data, scope) => {
        let res;
        const id = data.inside ?? `__$DISCORD_DATA$__.guild?.id`;
        const currentScope = scope[scope.length - 1];
        const parsedId = (0, stringparser_1.parseString)(id);
        res = (0, util_1.escapeResult)(`__$DISCORD_DATA$__.guilds.cache.get(${parsedId})?.premiumProgressBarEnabled ?? false`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=isServerPremiumProgressBarEnabled.js.map