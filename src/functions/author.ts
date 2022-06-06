import { inspect } from "util";
import { TranspilerError } from "../error";
import { parseString } from "../stringparser";
import { FunctionData } from "../typings/interface";
import { escapeResult, escapeVars } from "../util";

export const $author: FunctionData = {
  name: "$author",
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
      name: "author",
      type: "string",
      required: true,
    },
    {
      name: "iconUrl",
      type: "string",
      required: false,
    },
    {
      name: "url",
      type: "string",
      required: false,
    },
  ],
  code: (data, scope) => {
    const fields = data.splits;
    const currentScope = scope[scope.length - 1];
    if (isNaN(Number(fields[0]))) {
      const author = parseString(fields[0]);
      const iconUrl = fields[1] ? parseString(fields[1]) : undefined;
      const url = fields[2] ? parseString(fields[2]) : undefined;
      const index = 0;
      if (!currentScope.embeds[index]) {
        currentScope.embeds[index] = { fields: [] };
        currentScope.setters += `${escapeVars(
          `${currentScope.name}_embeds`,
        )}[${index}] = {fields: []};\n`;
      }
      currentScope.embeds[index].author = {
        name: author,
        iconURL: iconUrl,
        url,
      };
      currentScope.rest = currentScope.rest.replace(data.total, "");
      scope[scope.length - 1] = currentScope;
      const res = escapeResult(
        escapeVars(`${currentScope.name}_embeds`) +
          `[${index}].author = ${inspect(
            {
              name: author,
              iconURL: iconUrl,
              url,
            },
            { depth: null },
          )
            .replace(`name: '${author}'`, `name: ${author}`)
            .replace(`iconURL: '${iconUrl}'`, `iconURL: ${iconUrl}`)
            .replace(`url: '${url}'`, `url: ${url}`)};`,
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
      const author = parseString(fields[1]);
      const iconUrl = fields[2] ? parseString(fields[2]) : undefined;
      const url = fields[3] ? parseString(fields[3]) : undefined;
      if (!currentScope.embeds[index]) {
        currentScope.embeds[index] = { fields: [] };
        currentScope.setters += `${escapeVars(
          `${currentScope.name}_embeds`,
        )}[${index}] = {fields: []};\n`;
      }
      currentScope.embeds[index].author = {
        name: author,
        iconURL: iconUrl,
        url,
      };
      currentScope.rest = currentScope.rest.replace(data.total, "");
      const res = escapeResult(
        escapeVars(`${currentScope.name}_embeds`) +
          `[${index}].author = ${inspect(
            {
              name: author,
              iconURL: iconUrl,
              url,
            },
            { depth: null },
          )
            .replace(`name: '${author}'`, `name: ${author}`)
            .replace(`iconURL: '${iconUrl}'`, `iconURL: ${iconUrl}`)
            .replace(`url: '${url}'`, `url: ${url}`)};`,
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
