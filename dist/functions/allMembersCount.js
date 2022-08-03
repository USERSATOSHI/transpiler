"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$allMembersCount = void 0;
const util_1 = require("../util");
exports.$allMembersCount = {
    name: "$allMembersCount",
    brackets: false,
    optional: true,
    type: "function_getter",
    fields: [],
    description: "returns all members count",
    default: [],
    returns: "string",
    version: "1.0.0",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        if (!currentScope.setters.includes("async function __$allMembersCount$__()")) {
            const setres = `
            async function __$allMembersCount$__() {
                return __$DISCORD_DATA$__.client.guilds.cache.reduce((acc, guild) => {
                    return acc.memberCount + guild.memberCount;
                })
            }
        `;
            currentScope.functions += setres + "\n";
        }
        const res = (0, util_1.escapeResult)(`__$allMembersCount$__()`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=allMembersCount.js.map