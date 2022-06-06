import { TranspilerError } from "../error";
import { Scope } from "../scope";
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
  code: (data: funcData, scope: Scope[]) => {
    let res;
    const splits = data.splits;
    if ($let.brackets) {
      if (!data.total.startsWith($let.name + "[")) {
        throw new TranspilerError(`${data.name} requires closure brackets`);
      }
    }
    console.log({letData:data})
    if (splits.length !== 2) {
      throw new TranspilerError(`${data.name} requires 2 arguments`);
    }
    const name = removeSetFunc(splits[0]);
    const value = parseData(removeSetFunc(splits[1]));

    if (name === "") {
      throw new TranspilerError(`${data.name} requires a name`);
    }
    if (name === value) {
      throw new TranspilerError(`${data.name} cannot be used to set itself`);
    }

    const currentScope = scope[scope.length - 1];
    if (currentScope.variables.includes(name)) {
      if (
        currentScope.variables.includes(parseResult(value)) ||
        value.startsWith("#FUNCTION_START#")
      ) {
        res = `${escapeVars(name)} = ${value};`;
      } else {
        res = `${escapeVars(name)} = \`${value}\`;`;
      }
    } else {
      if (
        typeof value !== "string" ||
        currentScope.variables.includes(parseResult(value.toString())) ||
        value.toString().startsWith("#FUNCTION_START#")
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
