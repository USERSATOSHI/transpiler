import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $guildId: FunctionData = {
  name: "$guildId",
  brackets: true,
  optional: true,
  type: "getter",
  fields: [
    {
      name: "guildName",
      type: "string",
      required: false,
    },
  ],
  version: "1.0.0",
  default: [""],
  returns: "Snowflake",
  description: "Returns the guild's ID",
  code: (data: funcData, scope: Scope[]) => {
    const guildName = data.inside;
    let res = guildName
      ? escapeResult(
          `__$DISCORD_DATA$__.client.guilds.cache.find(x => x.name === \`${guildName}\`)?.id`,
        )
      : escapeResult("__$DISCORD_DATA$__.guild?.id");
    const currentScope = scope[scope.length - 1];
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
