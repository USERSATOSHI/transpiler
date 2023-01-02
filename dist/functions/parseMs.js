"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$parseMs = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
exports.$parseMs = {
    name: "$parseMs",
    brackets: true,
    optional: false,
    type: "getter",
    fields: [
        {
            name: "ms",
            type: "number",
            required: true,
        },
        {
            name: "limit",
            type: "number",
            required: false,
        },
        {
            name: "separator",
            type: "string",
            required: false,
        },
        {
            name: "addAnd",
            type: "boolean",
            required: false,
        },
    ],
    description: "parses time in ms to a readable time",
    default: ["void", "2", ", ", "yes"],
    returns: "string",
    version: "1.0.0",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const [ms, limit = 2, separator = ", ", addAnd = "yes"] = data.splits;
        if (isNaN(Number(ms)) &&
            !(currentScope.name.startsWith("$try_") ||
                currentScope.name.startsWith("$catch_"))) {
            throw new error_1.TranspilerError(`${data.name}: ms is not a number`);
        }
        if (isNaN(Number(limit)) &&
            !(currentScope.name.startsWith("$try_") ||
                currentScope.name.startsWith("$catch_"))) {
            throw new error_1.TranspilerError(`${data.name}: limit is not a number`);
        }
        if (typeof separator != "string" &&
            !(currentScope.name.startsWith("$try_") ||
                currentScope.name.startsWith("$catch_"))) {
            throw new error_1.TranspilerError(`${data.name}: separator is not a string`);
        }
        const parsedAddAnd = (0, util_1.convertToBool)(addAnd);
        const parsedMs = Number(ms);
        const parsedLimit = Number(limit);
        const res = (0, util_1.escapeResult)(`
            __$DISCORD_DATA$__.bot.parser.parseToString(${parsedMs},{
                limit: ${parsedLimit},
                separator: \`${separator}\`,
                addAnd: ${parsedAddAnd},
            })
      `);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope,
        };
    },
};
//# sourceMappingURL=parseMs.js.map