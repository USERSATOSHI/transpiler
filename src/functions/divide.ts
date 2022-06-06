import { TranspilerError } from "../error";
import { FunctionData } from "../typings/interface";
import { escapeResult } from "../util";

export const $divide: FunctionData = {
  name: "$divide",
  type: "getter",
  brackets: true,
  optional: false,
  fields: [
    {
      name: "numbers",
      type: "number",
      required: true,
    },
  ],
  code: (data, scope) => {
    const numbers = data.splits;
    const currentScope = scope[scope.length - 1];
    if (data.splits.length === 0) {
      throw new TranspilerError(`${data.name} requires at least 1 argument`);
    }
    let div = `${numbers
      .map((x) =>
        x.startsWith("#FUNCTION_START#") || x.startsWith("__$DISCORD_DATA$__")
          ? x
          : Number(x),
      )
      .join("/")}`;

    const res = escapeResult(div);
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope,
    };
  },
};
