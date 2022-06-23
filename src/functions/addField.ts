import { inspect } from "util";
import { TranspilerError } from "../error";
import { parseString } from "../stringparser";
import { FunctionData } from "../typings/interface";
import { convertToBool, escapeResult, escapeVars } from "../util";

export const $addField: FunctionData = {
  name: "$addField",
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
      name: "name",
      type: "string",
      required: true,
    },
    {
      name: "value",
      type: "string",
      required: true,
    },
    {
      name: "inline",
      type: "boolean",
      required: false,
    },
  ],
  version: "1.0.0",
  description: "Adds a field to the Embed",
  default: ["1", "void", "void", "no"],
  returns: "void",
  code: (data, scope) => {
    const fields = data.splits;
    const currentScope = scope[scope.length - 1];
    if (isNaN(Number(fields[0]))) {
      let name = parseString(fields[0]);
      let value = parseString(fields[1]);
      let inline = convertToBool(fields[2]);
      const index = 0;
      if (!currentScope.embeds[index]) {
        currentScope.embeds[index] = { fields: [] };
        currentScope.setters += `${escapeVars(
          `${currentScope.name}_embeds`,
        )}[${index}] = {fields: []};\n`;
      }
      if (!currentScope.embeds[index].fields) {
        currentScope.embeds[index].fields = [];
        currentScope.setters += `${escapeVars(
          `${currentScope.name}_embeds`,
        )}[${index}].fields = [];\n`;
      }
      currentScope.embeds[index].fields.push({
        name,
        value,
        inline,
      });
      currentScope.rest = currentScope.rest.replace(data.total, "");
      const res = escapeResult(
        escapeVars(`${currentScope.name}_embeds`) +
          `[${index}].fields.push({
        name: ${name},
        value: ${value},
        inline: ${inline},
          })`,
      );
      currentScope.setters += res + "\n";
      scope[scope.length - 1] = currentScope;
      return {
        code: res,
        scope,
      };
    } else {
      const index = Number(fields[0]) - 1;
      if (
        index < 0 ||
        (index > 9 &&
          (!currentScope.name.startsWith("$try_") ||
            !currentScope.name.startsWith("$catch_")))
      ) {
        throw new TranspilerError(`${data.name} requires a valid index`);
      }
      let name = parseString(fields[1]);
      let value = parseString(fields[2]);
      let inline = convertToBool(fields[3]);
      if (!currentScope.embeds[index]) {
        currentScope.embeds[index] = { fields: [] };
        currentScope.setters += `${escapeVars(
          `${currentScope.name}_embeds`,
        )}[${index}] = {fields: []};\n`;
      }
      if (!currentScope.embeds[index].fields)
        currentScope.embeds[index].fields = [];
      currentScope.embeds[index].fields?.push({
        name,
        value,
        inline,
      });
      const res = escapeResult(
        escapeVars(`${currentScope.name}_embeds`) +
          `[${index}].fields.push({
        name: ${name},
        value: ${value},
        inline: ${inline},
          })`,
      );
      currentScope.setters += res + "\n";
      currentScope.rest = currentScope.rest.replace(data.total, "");
      scope[scope.length - 1] = currentScope;
      return {
        code: res,
        scope,
      };
    }
  },
};
