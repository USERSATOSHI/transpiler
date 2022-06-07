import { conditionLexer } from "../conditionlexer";
import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult, parseResult } from "../util";

export const $checkCondition: FunctionData = {
  name: "$checkCondition",
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
  description: "Checks the condition",
  code: (data: funcData, scope: Scope[]) => {
    const condition = data.inside;
    const currentScope = scope[scope.length - 1];
    if (!condition) {
      throw new TranspilerError(`${data.name}: condition is required`);
    }
    const parsedCondition = conditionLexer(condition).solve(false);
    console.log({ parsedCondition });
    const res = escapeResult(parseResult(parsedCondition));
    currentScope.rest = currentScope.rest.replace(data.total, res);

    return {
      code: res,
      scope: scope,
    };
  },
};
