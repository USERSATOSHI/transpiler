import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $channelName: FunctionData = {
  name: "$channelName",
  brackets: false,
  optional: true,
  type: "getter",
  fields: [
    {
      name: "channelId",
      type: "Snowflake",
      required: true,
    }
  ],
  code: (data: funcData, scope: Scope[]) => {
    const id = data.inside;
    let res = id
      ? escapeResult(
          `__$DISCORD_DATA$__.client.channels.cache.get(\`${id}\`)?.name`,
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
