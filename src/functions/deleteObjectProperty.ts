import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult, escapeVars, parseData } from "../util";
export const $deleteObjectProperty: FunctionData = {
  name: "$deleteObjectProperty",
  brackets: true,
  optional: false,
  type: "function",
  version: "1.0.0",
  fields: [
    {
      name: "name",
      type: "string",
      required: true,
    },
    {
      name: "key",
      type: "string",
      required: true,
    },
  ],
  description: "deletes a key from the object",
  default: ["void", "void"],
  returns: "void",
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    const [name, key] = data.splits;

    if (
      !key.length &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name}: No Key Provided`);
    }
    if (
      !currentScope.objects[name] &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name}: Invalid Object Name Provided`);
    }
    delete currentScope.objects[name][key];
    const res = escapeResult(`delete ${escapeVars(name)}.${key}`);
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope,
    };
  },
};
