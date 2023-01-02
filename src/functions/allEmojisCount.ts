import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";
export const $allEmojisCount: FunctionData = {
    name: "$allEmojisCount",
    brackets: true,
    optional: true,
    type: "function_getter",
    fields: [],
    description: "returns all Emojis count",
    default: [],
    returns: "string",
    version: "1.0.0",
    code: (data: funcData, scope: Scope[]) => {
        const currentScope = scope[ scope.length - 1 ];
        const type = data.inside ?? "all";
        if (
            !currentScope.setters.includes(
                "async function __$allEmojisCount$__(type = 'all')",
            )
        )
        {
            const setres = `
            async function __$allEmojisCount$__(type = 'all') {
                if(type === 'all') {
                    return await d.client.emojis.cache.size;
                } else {
                    return await d.client.emojis.cache.filter(e => type === 'animated' ? e.animated : type === 'managed' ? e.managed : type === 'normal' ?  !e.animated : true)).size;
                }
            }
        `;
            currentScope.functions += setres +"\n";
        }
        const res = escapeResult(`__$allEmojisCount$__(${type})`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
