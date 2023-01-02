import { TranspilerError } from "../error";
import fixMath from "../mathlexer";
import { Scope } from "../scope";
import { parseString } from "../stringparser";
import { funcData, FunctionData } from "../typings/interface";
import { escapeFunctionResult, escapeResult } from "../util";
export const $log: FunctionData = {
  name: "$log",
  brackets: true,
  optional: false,
  type: "function",
  fields: [
    {
      name: "text",
      type: "string",
      required: true,
    },
  ],
  version: "1.0.0",
  default: ["void"],
  returns: "void",
  description: "Logs the text",
  code: (data: funcData, scope: Scope[]) => {
    let res;
    const splits = data.splits;
    const currentScope = scope[scope.length - 1];
    if ($log.brackets) {
      if (
        !data.total.startsWith($log.name + "[") &&
        (!currentScope.name.startsWith("$try_") ||
          !currentScope.name.startsWith("$catch_"))
      ) {
        throw new TranspilerError(`${data.name} requires closure brackets`);
      }
    }
    if (
      splits.length !== 1 &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name} requires 1 argument`);
    }
    const text = splits[0];
    if (
      text === "" &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name} requires a text`);
    }
    const parsedText = parseString(fixMath(text));
    res = `${escapeFunctionResult(`console.log(${parsedText});`)}`;
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return { code: res, scope: scope, data };
  },
};
