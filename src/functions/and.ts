import { conditionLexer } from "../conditionlexer";
import { FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $and: FunctionData = {
  name: "$and",
  type: "getter",
  brackets: true,
  optional: false,
  fields: [
    {
      name: "condition",
      type: "string",
      required: true,
    },
  ],
  default: ["void"],
  returns: "boolean",
  description: "Returns true if all conditions are true",
  code: (data, scope) => {
    const conditions = data.splits;
    const currentScope = scope[scope.length - 1];
    const solved = conditionLexer(conditions.join("&&")).solve(false);

    const res = escapeResult(solved);
    currentScope.rest = currentScope.rest.replace(data.total, res);

    return {
      code: res,
      scope,
    };
  },
};
