import { Scope } from "../scope";
import { parseString } from "../stringparser";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $slashOption: FunctionData = {
  name: "$slashOption",
  type: "getter",
  brackets: true,
  optional: true,
  fields: [
    {
      name: "field",
      type: "string",
      required: true,
    },
  ],
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    const text = <string>data.inside;
    const res = escapeResult(
      `__$DISCORD_DATA$__.interaction.options.get(${parseString(text)})?.value`,
    );
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
