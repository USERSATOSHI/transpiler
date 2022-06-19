import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $commandName: FunctionData = {
  name: "$commandName",
  type: "getter",
  brackets: false,
  optional: false,
  fields: [],
  default: [],
  returns: "string",
  description: "Returns the command's name",
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    const res = escapeResult(`__$DISCORD_DATA$__.interaction.commandName`);
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
