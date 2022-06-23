import { inspect } from "util";
import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult, escapeVars } from "../util";
export const $createObject: FunctionData = {
  name: "$createObject",
  brackets: true,
  optional: false,
  type: "setter",
  fields: [
    {
      name: "name",
      type: "string",
      required: true,
    },
    {
      name: "object",
      type: "json",
      required: true,
    },
  ],
  description: "",
  default: [],
  returns: "void",
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    const [name, ...obj] = data.splits;
    const parsedObj = obj.join(";");
    if (
      !obj.length &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name}: No JSON Provided`);
    }
    if (
      (!parsedObj?.startsWith("{") || !parsedObj.endsWith("}")) &&
      (!parsedObj?.startsWith("[") || parsedObj?.endsWith("]")) &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name}: Invalid JSON Provided`);
    }
    let object;
    try {
      object = JSON.parse(<string>parsedObj);
    } catch {
      if (
        !currentScope.name.startsWith("$tru_") &&
        !currentScope.name.startsWith("$catch_")
      ) {
        throw new TranspilerError(`${data.name}: Invalid JSON Provided`);
      }
    }
    const res = escapeResult(
      `const ${escapeVars(name)} = ${inspect(object, { depth: Infinity })}`,
    );
    currentScope.objects[name] = object;
    currentScope.setters += res + "\n";
    currentScope.rest = currentScope.rest.replace(data.total, "");

    return {
      code: "",
      scope,
    };
  },
};
