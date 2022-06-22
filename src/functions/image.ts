import { TranspilerError } from "../error";
import { parseString } from "../stringparser";
import { FunctionData } from "../typings/interface";
import { escapeResult, escapeVars } from "../util";
export const $image: FunctionData = {
  name: "$image",
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
      name: "url",
      type: "string",
      required: true,
    },
  ],
  default: ["1", "void"],
  returns: "void",
  description: "Sets the image of the embed",
  code: (data, scope) => {
    const fields = data.splits;
    const currentScope = scope[scope.length - 1];

    if (isNaN(Number(fields[0]))) {
      const url = parseString(fields.join(";"));
      const index = 0;
      if (!currentScope.embeds[index]) {
        currentScope.embeds[index] = { fields: [] };
        currentScope.setters += `${escapeVars(
          `${currentScope.name}_embeds`,
        )}[${index}] = {fields: []};\n`;
      }
      currentScope.embeds[index].image = { url };
      currentScope.rest = currentScope.rest.replace(data.total, "");
      scope[scope.length - 1] = currentScope;
      const res = escapeResult(
        escapeVars(`${currentScope.name}_embeds`) +
          `[${index}].image = {
            url: ${url},
          };`,
      );
      currentScope.setters += res + "\n";
      return {
        code: res,
        scope,
      };
    } else {
      const index = Number(fields.shift()) - 1;
      if (
        index < 0 ||
        (index > 9 &&
          (!currentScope.name.startsWith("$try_") ||
            !currentScope.name.startsWith("$catch_")))
      ) {
        throw new TranspilerError(`${data.name} requires a valid index`);
      }
      const url = parseString(fields.join(";"));
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
          `[${index}].image = {
            url: ${url},
          };`,
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
