"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$comment = void 0;
const util_1 = require("../util");
exports.$comment = {
    name: "$comment",
    type: "scope",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "comment",
            type: "string",
            required: true,
        },
    ],
    default: ["void"],
    returns: "void",
    description: "Converts provided code to a comment",
    code: (data, scope) => {
        const comment = data.inside;
        const currentScope = scope[scope.length - 1];
        const res = (0, util_1.escapeResult)(`/*${comment}*/`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        data.funcs = [];
        return {
            code: res,
            scope: scope,
            data: data,
        };
    },
};
//# sourceMappingURL=comment.js.map