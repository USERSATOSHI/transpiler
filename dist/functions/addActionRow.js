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
    version: "1.0.0",
    returns: "void",
    description: "Adds a row to the components table",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        if (data.inside &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name} cannot have a parameter inside`);
        }
        if (currentScope.components.length > 5 &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name} cannot have more than 5 components`);
        }
        const component = { type: 1, components: [] };
        //@ts-ignore
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