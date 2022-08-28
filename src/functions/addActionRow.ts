import { inspect } from "util";
import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult, escapeVars } from "../util";

export const $addActionRow: FunctionData = {
  name: "$addActionRow",
  brackets: false,
  optional: false,
  fields: [],
  type: "setter",
  default: [],
  version: "1.0.0",
  returns: "void",
  description: "Adds a row to the components table",
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    if (
      data.inside &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name} cannot have a parameter inside`);
    }
    if (
      currentScope.components.length > 5 &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(
        `${data.name} cannot have more than 5 components`,
      );
    }
    const component = { type: 1, components: [] };
    //@ts-ignore
    currentScope.components.push(component);
    currentScope.rest = currentScope.rest.replace(data.total, "");
    const res = escapeResult(
      `${escapeVars(`${currentScope.name}_components`)}.push(${inspect(
        component,
        { depth: null },
      )});`,
    );
    currentScope.setters += res + "\n";
    return {
      code: res,
      scope: scope,
    };
  },
};
