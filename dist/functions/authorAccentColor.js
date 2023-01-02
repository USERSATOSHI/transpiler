"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$authorAccentColor = void 0;
const util_1 = require("../util");
exports.$authorAccentColor = {
    name: "$authorAccentColor",
    brackets: false,
    optional: true,
    type: "getter",
    fields: [],
    version: "1.0.0",
    default: [],
    returns: "string",
    description: "Returns the accent Color of the author",
    code: (data, scope) => {
        let res = (0, util_1.escapeResult)("(await __$DISCORD_DATA$__.author?.fetch()).hexAccentColor");
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=authorAccentColor.js.map