import { Scope } from "../scope";
import { parseString } from "../stringparser";
import { funcData, FunctionData } from "../typings/interface";
import { convertToBool, escapeResult } from "../util";

export const $eval: FunctionData = {
  name: "$eval",
  type: "function",
  brackets: true,
  optional: false,
  fields: [
    {
      name: "output",
      type: "boolean",
      required: true,
    },
    {
      name: "code",
      type: "string",
      required: true,
    },
  ],
  default: ["void", "void"],
  returns: "any",
  version: "1.0.0",
  description: "Evaluates the code",
  code: (data: funcData, scope: Scope[]) => {
    const [output, ...code] = data.splits;
    const parsedOutput = convertToBool(output);
    const currentScope = scope[scope.length - 1];
    const hash = Math.floor(Math.random() * 100000);
    const executedCode = `Transpiler(${parseString(
      code.join(";"),
    )}, ${parsedOutput}, {}, false).func(__$DISCORD_DATA$__);\n`;
    const res = escapeResult(`
    ${executedCode}
    `);
    if (
      !currentScope.packages.includes(
        "const { Transpiler } = await import('./transpiler.js');",
      )
    ) {
      currentScope.packages += `const { Transpiler } = await import('./transpiler.js');\n`;
    }
    currentScope.rest = currentScope.rest.replace(data.total, res);
    data.funcs = [];
    return {
      code: res,
      scope: scope,
      data: data,
    };
  },
};
