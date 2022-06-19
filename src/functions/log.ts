import { TranspilerError } from "../error";
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
  default: ["void"],
  returns: "void",
  description: "Logs the text",
  code: (data: funcData, scope: Scope[]) => {
    let res;
    const splits = data.splits;
    if ($log.brackets) {
      if (!data.total.startsWith($log.name + "[")) {
        console.log({ t: data.total, n: $log.name });
        throw new TranspilerError(`${data.name} requires closure brackets`);
      }
    }
    if (splits.length !== 1) {
      throw new TranspilerError(`${data.name} requires 1 argument`);
    }
    const text = splits[0];
    const currentScope = scope[scope.length - 1];
    if (text === "") {
      throw new TranspilerError(`${data.name} requires a text`);
    }
    const parsedText = parseString(text);
    res = `${escapeFunctionResult(`console.log(${parsedText});`)}`;
    console.log({ total: data.total, res, rest: currentScope.rest });
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return { code: res, scope: scope, data };
  },
};
