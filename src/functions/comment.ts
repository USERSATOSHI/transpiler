import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $comment: FunctionData = {
  name: "$comment",
  type: "scope",
  brackets: true,
  optional: false,
  fields: [
    {
      name: "comment",
      type: "string",
      required: true,
    },
  ],
  default: ["void"],
  returns: "void",
  description: "Converts provided code to a comment",
  code: (data: funcData, scope: Scope[]) => {
    const comment = data.inside;
    const currentScope = scope[scope.length - 1];
    const res = escapeResult(`/*${comment}*/`);
    currentScope.rest = currentScope.rest.replace(data.total, res);
    data.funcs = [];
    return {
      code: res,
      scope: scope,
      data: data,
    };
  },
};
