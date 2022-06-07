import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { parseString } from "../stringparser";
import { funcData, FunctionData } from "../typings/interface";
import { escapeFunctionResult, escapeResult } from "../util";

export const $isBot: FunctionData = {
  name: "$isBot",
  brackets: true,
  optional: true,
  type: "function_getter",
  fields: [
    {
      name: "name",
      type: "string",
      required: false,
    },
  ],
  default: ["__$DISCORD_DATA$__.author?.id"],
  returns: "boolean",
  description: "Checks if the author is a bot",
  code: (data: funcData, scope: Scope[]) => {
    let res;
    const userId = data.inside ?? `__$DISCORD_DATA$__.author?.id`;
    if ($isBot.brackets) {
      if (!data.total.startsWith($isBot.name + "[")) {
        throw new TranspilerError(`${data.name} requires closure brackets`);
      }
    }
    const currentScope = scope[scope.length - 1];
    ////console.log({vars:currentScope.variables})
    if (
      !currentScope.packages.includes(
        `const TRANSPILER_HELPERS = await import("./helpers.js")`,
      )
    ) {
      currentScope.packages += `const TRANSPILER_HELPERS = await import("./helpers.js");\n`;
    }
    if (
      !currentScope.functions.includes("async function __$is_bot$__(userId) {")
    ) {
      res = escapeFunctionResult(`async function __$is_bot$__(userId) {
  const user = await TRANSPILER_HELPERS.getUser(userId,__$DISCORD_DATA$__.client);
  return user?.bot ?? false;
      }`);
      currentScope.functions += res + "\n";
    }
    const parsedUserId = parseString(userId);
    res = escapeResult(`await __$is_bot$__(${parsedUserId})`);

    currentScope.rest = currentScope.rest.replace(data.total, res);
    return {
      code: res,
      scope: scope,
    };
  },
};
