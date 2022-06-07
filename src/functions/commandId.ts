import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $commandId: FunctionData = {
  name: "$commandId",
  type: "getter",
  brackets: false,
  optional: false,
  fields: [],
  default: [],
  returns: "Snowflake",
  description: "Returns the command's ID",
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    const res = escapeResult(`__$DISCORD_DATA$__.interaction.commandId`);
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
