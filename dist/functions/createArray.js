"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$createArray = void 0;
const error_1 = require("../error");
const objectParser_1 = require("../objectParser");
const util_1 = require("../util");
exports.$createArray = {
    name: "$createArray",
    brackets: true,
    optional: false,
    type: "setter",
    fields: [
        {
            name: "varName",
            type: "string",
            required: true,
        },
        {
            name: "...elements",
            type: "any",
            required: true
        }
    ],
    description: "creates an Array",
    default: ['void', 'void'],
    returns: 'void',
    version: "1.0.0",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const [name, ...obj] = data.splits;
        const parsedObj = obj.join(",");
        if (!obj.length &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: No Elements Provided`);
        }
        const currentObj = new objectParser_1.StringObject("[");
        currentObj.addEnd(']');
        const object = (0, objectParser_1.parseStringObject)(`[${parsedObj}]`, currentObj);
        const res = (0, util_1.escapeResult)(`${(0, util_1.escapeVars)(name)} = ${object.solve()};`);
        currentScope.objects[name] = object;
        currentScope.setters += res + "\n";
        currentScope.rest = currentScope.rest.replace(data.total, "");
        return {
            code: "",
            scope,
        };
    },
};
//# sourceMappingURL=createArray.js.map