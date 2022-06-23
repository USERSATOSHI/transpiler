import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { parseString } from "../stringparser";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult, parseData } from "../util";
export const $isNumber: FunctionData = {
  name: "$isNumber",
  brackets: true,
  optional: false,
  type: "getter",
  fields: [
    {
      name: "query",
      type: "any",
      required: true,
    },
  ],
  version: "1.0.0",
  default: ["void"],
  returns: "boolean",
  description: "Checks if the query is a number",
  code: (data: funcData, scope: Scope[]) => {
    let res;
    const num = data.inside;
    const currentScope = scope[scope.length - 1];
    if (
      !num &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name} requires 1 argument`);
    }

    let parsedNum;
    const typedNum = parseData(<string>num);
    if (typeof typedNum === "string") {
      parsedNum = parseString(typedNum);
    } else parsedNum = typedNum;
    res = `${escapeResult(
      `typeof${parsedNum} === 'string' && ${parsedNum}.trim() === "" ? false : !isNaN(${parsedNum});`,
    )}`;
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
