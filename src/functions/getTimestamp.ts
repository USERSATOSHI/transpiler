import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $getTimestamp: FunctionData = {
  name: "$getTimestamp",
  brackets: false,
  optional: true,
  type: "getter",
  fields: [],
  default: [],
  version: "1.0.0",
  returns: "number",
  description: "Returns current timestamp",
  code: (data: funcData, scope: Scope[]) => {
    let res = escapeResult("Date.now()");
    const currentScope = scope[scope.length - 1];
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
