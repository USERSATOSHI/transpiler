import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $message: FunctionData = {
  name: "$message",
  brackets: true,
  optional: true,
  type: "getter",
  fields: [
    {
      name: "arg",
      type: "number",
      required: false,
    },
  ],
  version: "1.0.0",
  default: [""],
  returns: "string",
  description: "Returns the message",
  code: (data: funcData, scope: Scope[]) => {
    let [arg] = data.splits;
    const currentScope = scope[scope.length - 1];
    const parsedArg = Number(arg);
    if (
      arg &&
      isNaN(parsedArg) &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(
        `${data.name}: requires a number as an argument`,
      );
    }
    let res = arg
      ? escapeResult(`__$DISCORD_DATA$__.args?.[${parsedArg - 1}]`)
      : escapeResult("__$DISCORD_DATA$__.args?.join(` `)");
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
