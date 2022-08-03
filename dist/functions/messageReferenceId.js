"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$messageReferenceId = void 0;
const util_1 = require("../util");
exports.$messageReferenceId = {
    name: "$messageReferenceId",
    brackets: false,
    optional: true,
    type: "getter",
    fields: [],
    description: "returns the message's reference id",
    default: [],
    returns: "string",
    version: "1.0.0",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const res = (0, util_1.escapeResult)(`__$DISCORD_DATA$__.message?.reference?.id`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=messageReferenceId.js.map