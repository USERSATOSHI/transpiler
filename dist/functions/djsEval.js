"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$djsEval = void 0;
const error_1 = require("../error");
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$djsEval = {
    name: "$djsEval",
    brackets: true,
    optional: false,
    type: "function_getter",
    fields: [
        {
            name: "output",
            type: "string",
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
    description: "Evaluates the provided Js code",
    code: (data, scope) => {
        const splits = data.splits;
        const [output, ...code] = splits;
        const currentScope = scope[scope.length - 1];
        const parsedOutput = (0, util_1.convertToBool)(output);
        if (exports.$djsEval.brackets) {
            if (!data.total.startsWith(exports.$djsEval.name + "[") &&
                (!currentScope.name.startsWith("$try_") ||
                    !currentScope.name.startsWith("$catch_"))) {
                throw new error_1.TranspilerError(`${data.name} requires closure brackets`);
            }
        }
        if (splits.length < 2 &&
            (!currentScope.name.startsWith("$try_") &&
                !currentScope.name.startsWith("$catch_"))) {
            throw new error_1.TranspilerError(`${data.name} requires 2 arguments`);
        }
        const Code = (0, stringparser_1.parseString)(code.join(";"));
        if (!currentScope.functions.includes("async function __$djsEval$__(Code) {")) {
            const setres = `
    async function __$djsEval$__(Code) {
      try {
        const evaled =  await eval(Code);
        return typeof evaled === "object" ? UTIL.inspect(evaled,{depth:0}) : evaled;
      } catch (e) {
        return e;
      }
    }`;
            if (!currentScope.packages.includes("const UTIL = await import('util');")) {
                currentScope.packages += "const UTIL = await import('util');\n";
            }
            currentScope.functions += (0, util_1.escapeResult)(setres) + "\n";
        }
        const res = `${(0, util_1.escapeResult)(`await __$djsEval$__.call(__$DISCORD_DATA$__,${Code})`)}`;
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: parsedOutput ? res : "",
            scope: scope,
        };
    },
};
//# sourceMappingURL=djsEval.js.map