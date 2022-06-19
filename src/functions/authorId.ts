import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $authorId: FunctionData = {
  name: "$authorId",
  brackets: false,
  optional: true,
  type: "getter",
  fields: [],
  default: [],
  returns: "Snowflake",
  description: "Returns the author's ID",
  code: (data: funcData, scope: Scope[]) => {
    let res = escapeResult("__$DISCORD_DATA$__.author?.id");
    const currentScope = scope[scope.length - 1];
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
