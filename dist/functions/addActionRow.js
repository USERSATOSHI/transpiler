"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$addActionRow = void 0;
const util_1 = require("util");
const error_1 = require("../error");
const util_2 = require("../util");
exports.$addActionRow = {
    name: "$addActionRow",
    brackets: false,
    optional: false,
    fields: [],
    type: "setter",
    default: [],
    returns: "void",
    description: "Adds a row to the components table",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        if (data.inside) {
            throw new error_1.TranspilerError(`${data.name} cannot have a parameter inside`);
        }
        if (currentScope.components.length > 5) {
            throw new error_1.TranspilerError(`${data.name} cannot have more than 5 components`);
        }
        const component = { type: 1, components: [] };
        currentScope.components.push(component);
        currentScope.rest = currentScope.rest.replace(data.total, "");
        const res = (0, util_2.escapeResult)(`${(0, util_2.escapeVars)(`${currentScope.name}_components`)}.push(${(0, util_1.inspect)(component, { depth: null })});`);
        currentScope.setters += res + "\n";
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=addActionRow.js.map