import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $clientToken: FunctionData = {
  name: "$clientToken",
  brackets: false,
  optional:true,
  type: "getter",
  fields: [],
  code: (data: funcData, scope: Scope[]) => {
    let res = escapeResult("__$DISCORD_DATA$__.client.token");
    const currentScope = scope[scope.length - 1];
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
