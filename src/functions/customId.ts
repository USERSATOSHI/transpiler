import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $customId: FunctionData = {
  name: "$customId",
  type: "getter",
  brackets: false,
  optional: false,
  fields: [],
  default: [],
  returns: "Snowflake",
  description: "Returns the custom ID",
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    const res = escapeResult(`__$DISCORD_DATA$__.interaction.customId`);
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
