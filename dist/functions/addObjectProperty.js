"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$addObjectProperty = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
exports.$addObjectProperty = {
    name: "$addObjectProperty",
    brackets: true,
    optional: false,
    type: "function",
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
        {
            name: "value",
            type: "any",
            required: true,
        },
    ],
    version: "1.0.0",
    description: "adds a value to the key in the object",
    default: ["void", "void", "void"],
    returns: "void",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const [name, key, ...value] = data.splits;
        const parsedValue = (0, util_1.parseData)(value.join(";"));
        if (!value.length &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: No Value Provided`);
        }
        if (!currentScope.objects[name] &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: Invalid Object Name Provided`);
        }
        currentScope.objects[name].addKey(key);
        currentScope.objects[name].addValue(parsedValue);
        const res = (0, util_1.escapeResult)(`${(0, util_1.escapeVars)(name)}.${key} = ${parsedValue}`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope,
        };
    },
};
//# sourceMappingURL=addObjectProperty.js.map