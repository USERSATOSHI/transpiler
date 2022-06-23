import { Scope } from "../scope";
import { parseString } from "../stringparser";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";
export const $endsWith: FunctionData = {
  name: "$endsWith",
  brackets: true,
  optional: false,
  type: "getter",
  fields: [
    {
      name: "text",
      type: "string",
      required: true,
    },
    {
      name: "search",
      type: "string",
      required: true,
    },
  ],
  default: ["void", "void"],
  version: "1.0.0",
  returns: "boolean",
  description: "Checks if the text ends with the search",
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    const [text, search] = data.splits;
    const parsedText = parseString(text);
    const parsedSearch = parseString(search);
    const res = escapeResult(`${parsedText}.endsWith(${parsedSearch})`);
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
