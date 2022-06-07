import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $ephemeral: FunctionData = {
  name: "$ephemeral",
  type: "setter",
  brackets: false,
  optional: false,
  fields: [],
  default: [],
  returns: "void",
  description: "Sets the ephemeral value",
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    const res = "";
    currentScope.ephemeral = true;
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
