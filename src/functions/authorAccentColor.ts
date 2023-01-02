import { Scope } from "../scope";
import { parseString } from "../stringparser";
import { funcData, FunctionData } from "../typings/interface";
import { convertToBool, escapeResult, parseData } from "../util";

export const $authorAccentColor: FunctionData = {
  name: "$authorAccentColor",
  brackets: false,
  optional: true,
  type: "getter",
  fields: [
  ],
  version: "1.0.0",
  default: [],
  returns: "string",
  description: "Returns the accent Color of the author",
  code: (data: funcData, scope: Scope[]) => {
    let res = escapeResult("(await __$DISCORD_DATA$__.author?.fetch()).hexAccentColor");
    const currentScope = scope[scope.length - 1];
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
        code: res,
        scope: scope,
    };
  },
};
