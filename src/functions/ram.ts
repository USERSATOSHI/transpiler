import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { parseString } from "../stringparser";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";
export const $ram: FunctionData = {
  name: "$ram",
  brackets: true,
  optional: true,
  type: "getter",
  fields: [
    {
      name: "type",
      type: "rss|heapUsed|heapTotal|external|arrayBuffer",
      required: false,
    },
  ],
  version: "1.0.0",
  default: ["rss"],
  returns: "number",
  description: "Returns the bot's ram usage",
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    const type = parseString(data.inside ?? "rss");

    let res = escapeResult(
      `(process.memoryUsage()[${type}] / 1024 / 1024).toFixed(2)`,
    );
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
