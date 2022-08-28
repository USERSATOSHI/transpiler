import { conditionLexer } from "../conditionlexer";
import { FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $or: FunctionData = {
  name: "$or",
  type: "getter",
  brackets: true,
  optional: false,
  version: "1.0.0",
  fields: [
    {
      name: "condition",
      type: "string",
      required: true,
    },
  ],
  default: ["void"],
  returns: "boolean",
  description: "Returns true if any conditions are true",
  code: (data, scope) => {
    const conditions = data.splits;
    const currentScope = scope[scope.length - 1];
    const solved = conditionLexer(conditions.join("||")).solve(false);

    const res = escapeResult(solved);
    currentScope.rest = currentScope.rest.replace(data.total, res);

    return {
      code: res,
      scope,
    };
  },
};
