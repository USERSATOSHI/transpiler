import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $channelId: FunctionData = {
  name: "$channelId",
  brackets: true,
  optional: true,
  type: "getter",
  fields: [
    {
      name: "channel",
      type: "string",
      required: true,
    }
  ],
  code: (data: funcData, scope: Scope[]) => {
    const channelName = data.inside;
    let res = channelName
      ? escapeResult(
          `__$DISCORD_DATA$__.client.channels.cache.find(x => x.name === \`${channelName}\`)?.id`,
        )
      : escapeResult("__$DISCORD_DATA$__.channel?.id");
    const currentScope = scope[scope.length - 1];
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
