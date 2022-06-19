"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ephemeral = void 0;
exports.$ephemeral = {
    name: "$ephemeral",
    type: "setter",
    brackets: false,
    optional: false,
    fields: [],
    default: [],
    returns: "void",
    description: "Sets the ephemeral value",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const res = "";
        currentScope.ephemeral = true;
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=ephemeral.js.map