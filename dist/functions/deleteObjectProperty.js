"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$deleteObjectProperty = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
exports.$deleteObjectProperty = {
    name: "$deleteObjectProperty",
    brackets: true,
    optional: false,
    type: "function",
    version: "1.0.0",
    fields: [
        {
            name: "name",
            type: "string",
            required: true,
        },
        {
            name: "key",
            type: "string",
            required: true,
        },
    ],
    description: "deletes a key from the object",
    default: ["void", "void"],
    returns: "void",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const [name, key] = data.splits;
        if (!key.length &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: No Key Provided`);
        }
        if (!currentScope.objects[name] &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: Invalid Object Name Provided`);
        }
        const o = currentScope.objects[name];
        const index = o.keys.indexOf(key);
        o.keys.splice(index, 1);
        o.values.splice(index, 1);
        const res = (0, util_1.escapeResult)(`delete ${(0, util_1.escapeVars)(name)}.${key}`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope,
        };
    },
};
//# sourceMappingURL=deleteObjectProperty.js.map