import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $channelSlowMode: FunctionData = {
    name: "$channelSlowMode",
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
    description: "Returns the channel's slowmode",
    code: (data: funcData, scope: Scope[]) => {
        const id = data.inside;
        let res = id
            ? escapeResult(
                  `__$DISCORD_DATA$__.client.channels.cache.get(\`${id}\`)?.rateLimitPerUser`,
              )
            : escapeResult("__$DISCORD_DATA$__.channel?.name");
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
