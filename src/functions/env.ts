import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";
export const $env: FunctionData = {
  name: "$env",
  brackets: true,
  optional: false,
  type: "getter",
  fields: [
    {
      name: "env",
      type: "string",
      required: true,
    },
  ],
  description: "",
  default: ["void"],
  version: "1.0.0",
  returns: "?string",
  code: (data: funcData, scope: Scope[]) => {
    const env = data.inside;
    const currentScope = scope[scope.length - 1];
    if (
      !env &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name}: ENV Not Provided.`);
    }

    if (
      !currentScope.env.includes(<string>env) &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name}: ENV ${env} Not Found`);
    }
    const res = escapeResult(`${env}`);
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope,
    };
  },
};
