import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $ping: FunctionData = {
  name: "$ping",
  brackets: false,
  optional: true,
  type: "getter",
  fields: [],
  default: [],
  returns: "number",
  description: "Returns the bot's ping",
  code: (data: funcData, scope: Scope[]) => {
    const res = escapeResult("__$DISCORD_DATA$__.client.ws.ping");
      const currentScope = scope[scope.length - 1];
    currentScope.rest = currentScope.rest.replace(
      data.total,
      res,
    );
    return {
      code: res,
      scope: scope,
      data
    };
  },
};
