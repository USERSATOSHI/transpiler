"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$slashOption = void 0;
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$slashOption = {
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
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const text = data.inside;
        const res = (0, util_1.escapeResult)(`__$DISCORD_DATA$__.interaction.options.get(${(0, stringparser_1.parseString)(text)})?.value`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=slashOption.js.map