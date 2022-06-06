"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$endsWith = void 0;
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$endsWith = {
    name: "$endsWith",
    brackets: true,
    optional: false,
    type: "getter",
    fields: [
        {
            name: "text",
            type: "string",
            required: true,
        },
        {
            name: "search",
            type: "string",
            required: true,
        },
    ],
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const [text, search] = data.splits;
        const parsedText = (0, stringparser_1.parseString)(text);
        const parsedSearch = (0, stringparser_1.parseString)(search);
        const res = (0, util_1.escapeResult)(`${parsedText}.endsWith(${parsedSearch})`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=endsWith.js.map