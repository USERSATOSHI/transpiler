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
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    if (data.inside) {
      throw new TranspilerError(`${data.name} cannot have a parameter inside`);
    }
    if (currentScope.components.length > 5) {
      throw new TranspilerError(
        `${data.name} cannot have more than 5 components`,
      );
    }
    const component = { type: 1, components: [] };
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
