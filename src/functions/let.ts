import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { parseString } from "../stringparser";
import { funcData, FunctionData } from "../typings/interface";
import {
  escapeResult,
  escapeVars,
  parseData,
  parseResult,
  removeSetFunc,
} from "../util";

export const $let: FunctionData = {
  name: "$let",
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
      name: "value",
      type: "string",
      required: true,
    },
  ],
  version: "1.0.0",
  default: ["void", "void"],
  returns: "void",
  description: "Sets the value of the variable",
  code: (data: funcData, scope: Scope[]) => {
    let res;
    const splits = data.splits;
    const currentScope = scope[scope.length - 1];
    if ($let.brackets) {
      if (
        !data.total.startsWith($let.name + "[") &&
        (!currentScope.name.startsWith("$try_") ||
          !currentScope.name.startsWith("$catch_"))
      ) {
        throw new TranspilerError(`${data.name} requires closure brackets`);
      }
    }
    if (
      splits.length !== 2 &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name} requires 2 arguments`);
    }
    const name = removeSetFunc(splits[0]);
    let value = parseData(removeSetFunc(splits[1]));
    if (typeof value === "string" && value.includes("#FUNCTION_START#")) {
      value = parseString(value);
    }

    if (
      name === "" &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name} requires a name`);
    }
    if (
      name === value &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name} cannot be used to set itself`);
    }

    if (currentScope.variables.includes(name)) {
      if (
        currentScope.variables.includes(parseResult(value)) ||
        value.toString().startsWith("#FUNCTION_START#") ||
        (value.toString().startsWith("`") && value.toString().endsWith("`"))
      ) {
        res = `${escapeVars(name)} = ${value};`;
      } else {
        res = `${escapeVars(name)} = \`${value}\`;`;
      }
    } else {
      if (
        typeof value !== "string" ||
        currentScope.variables.includes(parseResult(value.toString())) ||
        value.toString().startsWith("#FUNCTION_START#") ||
        (value.toString().startsWith("`") && value.toString().endsWith("`"))
      ) {
        res = `let ${escapeVars(name)} = ${value};`;
      } else {
        res = `let ${escapeVars(name)} = \`${value}\`;`;
      }
    }
    currentScope.variables.push(name);
    currentScope.setters += escapeResult(res) + "\n";
    currentScope.rest = currentScope.rest.replace(
      removeSetFunc(data.total).replaceAll("#FUNCTION_SEPARATOR", ";"),
      "",
    );
    scope[scope.length - 1] = currentScope;

    return { code: "", scope: scope };
  },
};
