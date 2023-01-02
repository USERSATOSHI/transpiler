import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";
export const $allChannelsCount: FunctionData = {
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
    code: (data: funcData, scope: Scope[]) => {
        const currentScope = scope[scope.length - 1];
        const type = data.inside || "all";
        if (
            !currentScope.setters.includes(
                "async function __$allChannelsCount$__(type = 'all')",
            )
        ) {
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
        const res = escapeResult(`__$allChannelsCount$__('${type}')`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
