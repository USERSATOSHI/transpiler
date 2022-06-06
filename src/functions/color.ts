import { TranspilerError } from "../error";
import { parseString } from "../stringparser";
import { FunctionData } from "../typings/interface";
import { escapeResult, escapeVars, resolveColor } from "../util";
export const $color: FunctionData = {
  name: "$color",
  type: "setter",
  brackets: true,
  optional: false,
  fields: [
    {
      name: "index",
      type: "number",
      required: false,
    },
    {
      name: "color",
      type: "string | number",
      required: true,
    },
  ],
  code: (data, scope) => {
    const fields = data.splits;
    const currentScope = scope[scope.length - 1];
    if (
      !currentScope.packages.includes(
        "const { resolveColor } = await import('./util.js');",
      )
    ) {
      currentScope.packages +=
        "const { resolveColor } = await import('./util.js');\n";
    }
    if (isNaN(Number(fields[0]))) {
      const color = parseString(fields[0]);
      const index = 0;
      if (!currentScope.embeds[index]) {
        currentScope.embeds[index] = { fields: [] };
        currentScope.setters += `${escapeVars(
          `${currentScope.name}_embeds`,
        )}[${index}] = {fields: []};\n`;
      }
      currentScope.embeds[index].color = 1;
      currentScope.rest = currentScope.rest.replace(data.total, "");
      scope[scope.length - 1] = currentScope;
      const res = escapeResult(
        escapeVars(`${currentScope.name}_embeds`) +
          `[${index}].color = resolveColor(${color});`,
      );
      currentScope.setters += res + "\n";
      return {
        code: res,
        scope,
      };
    } else {
      const index = Number(fields[0]) - 1;
      if (index < 0 || index > 9) {
        throw new TranspilerError(`${data.name} requires a valid index`);
      }
      const color = parseString(fields[1]);
      if (!currentScope.embeds[index]) {
        currentScope.embeds[index] = { fields: [] };
        currentScope.setters += `${escapeVars(
          `${currentScope.name}_embeds`,
        )}[${index}] = {fields: []};\n`;
      }
      currentScope.embeds[index].color = 1;
      currentScope.rest = currentScope.rest.replace(data.total, "");
      const res = escapeResult(
        escapeVars(`${currentScope.name}_embeds`) +
          `[${index}].color = resolveColor(${color});`,
      );
      currentScope.setters += res + "\n";
      scope[scope.length - 1] = currentScope;
      return {
        code: res,
        scope,
      };
    }
  },
};
