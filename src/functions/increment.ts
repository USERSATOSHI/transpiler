import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeFunctionResult, escapeResult } from "../util";

export const $increment: FunctionData = {
  name: "$increment",
  type: "function",
  brackets: true,
  optional: false,
  fields: [
    {
      name: "variable",
      type: "string",
      required: true,
    },
    {
      name: "incrementFunction",
      type: "function",
      required: false,
    },
  ],
  default: ["void", "++"],
  extra: {
    example: "$increment[$get[i];++]"
  },
  returns: "void",
  description: "Increments the variable",
  code: (data: funcData, scope: Scope[]) => {
    const [variable, ...incrementFunction] = data.splits;
    const currentScope = scope[scope.length - 1];
    if (
      variable === "" &&
      (!currentScope.name.startsWith("$try_") &&
        !currentScope.name.startsWith("$catch_"))
    ) {
      throw new TranspilerError(`${data.name} requires a variable`);
    }
    if (incrementFunction.length === 0) {
      incrementFunction.push("++");
    }
    const incrementFunctionString = incrementFunction.join(";");
    const res = escapeFunctionResult(`${variable}${incrementFunctionString};`);
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
