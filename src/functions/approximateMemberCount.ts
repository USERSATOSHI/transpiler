import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";
export const $approximateMemberCount: FunctionData = {
    name: "$approximateMemberCount",
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
    description: "returns approx member count for provided guildId",
    default: ["__$DISCORD_DATA$__.guild?.id"],
    returns: "number | null",
    version: "1.0.0",
    code: (data: funcData, scope: Scope[]) => {
        const currentScope = scope[scope.length - 1];
        const guildId = data.inside;
        const res = escapeResult(
            guildId
                ? `__$DISCORD_DATA$__.client.guilds.cache.get(${guildId})?.approxMemberCount`
                : `__$DISCORD_DATA$__.guild?.approxMemberCount`,
        );
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
