"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isBot = void 0;
const error_1 = require("../error");
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$isBot = {
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
    code: (data, scope) => {
        let res;
        const currentScope = scope[scope.length - 1];
        const userId = data.inside ?? `__$DISCORD_DATA$__.author?.id`;
        if (exports.$isBot.brackets) {
            if (!data.total.startsWith(exports.$isBot.name + "[") &&
                (!currentScope.name.startsWith("$try_") ||
                    !currentScope.name.startsWith("$catch_"))) {
                throw new error_1.TranspilerError(`${data.name} requires closure brackets`);
            }
        }
        if (!currentScope.packages.includes(`const TRANSPILER_HELPERS = await import("./helpers.js")`)) {
            currentScope.packages += `const TRANSPILER_HELPERS = await import("./helpers.js");\n`;
        }
        if (!currentScope.functions.includes("async function __$is_bot$__(userId) {")) {
            res = (0, util_1.escapeFunctionResult)(`async function __$is_bot$__(userId) {
  const user = await TRANSPILER_HELPERS.getUser(userId,__$DISCORD_DATA$__.client);
  return user?.bot ?? false;
      }`);
            currentScope.functions += res + "\n";
        }
        const parsedUserId = (0, stringparser_1.parseString)(userId);
        res = (0, util_1.escapeResult)(`await __$is_bot$__(${parsedUserId})`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=isBot.js.map