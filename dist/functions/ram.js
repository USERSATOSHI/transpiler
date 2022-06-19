"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ram = void 0;
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$ram = {
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
    default: ["rss"],
    returns: "number",
    description: "Returns the bot's ram usage",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const type = (0, stringparser_1.parseString)(data.inside ?? "rss");
        let res = (0, util_1.escapeResult)(`(process.memoryUsage()[${type}] / 1024 / 1024).toFixed(2)`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=ram.js.map