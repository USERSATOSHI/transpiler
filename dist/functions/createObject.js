"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$createObject = void 0;
const error_1 = require("../error");
const objectParser_1 = require("../objectParser");
const util_1 = require("../util");
exports.$createObject = {
    name: "$createObject",
    brackets: true,
    optional: false,
    type: "setter",
    version: "1.0.0",
    fields: [
        {
            name: "name",
            type: "string",
            required: true,
        },
        {
            name: "object",
            type: "json",
            required: true,
        },
    ],
    description: "creates an Object",
    default: ["void", "void"],
    returns: "void",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const [name, ...obj] = data.splits;
        const parsedObj = obj.join(";");
        if (!obj.length &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: No Object Provided`);
        }
        const currentObj = new objectParser_1.StringObject("{");
        currentObj.addEnd("}");
        let object;
        try {
            object = (0, objectParser_1.parseStringObject)(parsedObj, currentObj);
        }
        catch (e) {
            throw new error_1.TranspilerError(`${data.name}: Invalid Object Provided`);
        }
        const res = (0, util_1.escapeResult)(`const ${(0, util_1.escapeVars)(name)} =  ${object.solve()};`);
        currentScope.objects[name] = object;
        currentScope.setters += res + "\n";
        currentScope.rest = currentScope.rest.replace(data.total, "");
        return {
            code: "",
            scope,
        };
    },
};
//# sourceMappingURL=createObject.js.map