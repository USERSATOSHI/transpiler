"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$allChannelsCount = void 0;
const util_1 = require("../util");
exports.$allChannelsCount = {
    name: "$allChannelsCount",
    brackets: false,
    optional: true,
    type: "function_getter",
    fields: [
        {
            name: "type",
            type: "string",
            required: false,
        },
    ],
    description: "returns all Channels count",
    default: ["all"],
    returns: "string",
    version: "1.0.0",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const type = data.inside || "all";
        if (!currentScope.setters.includes("async function __$allChannelsCount$__(type = 'all')")) {
            const setres = `
            async function __$allChannelsCount$__(type = 'all') {
                if(type === 'all') {
                    return __$DISCORD_DATA$__.client.channels.cache.size;
                } else {
                    return __$DISCORD_DATA$__.client.channels.cache.filter(channel => channel.type === type).size;
                }
                })
            }
        `;
            currentScope.functions += setres + "\n";
        }
        const res = (0, util_1.escapeResult)(`__$allChannelsCount$__('${type}')`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=allChannelsCount.js.map