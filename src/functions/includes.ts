import { Scope } from "../scope";
import { parseString } from "../stringparser";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";
export const $includes: FunctionData = {
  name: "$includes",
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
  version: "1.0.0",
  default: ["void", "void"],
  returns: "boolean",
  description: "Checks if the text includes the search",
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    const [text, search] = data.splits;
    const parsedText = parseString(text);
    const parsedSearch = parseString(search);
    const res = escapeResult(`${parsedText}.includes(${parsedSearch})`);
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
