"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$getObject = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
exports.$getObject = {
    name: "$getObject",
    brackets: true,
    optional: false,
    type: "getter",
    fields: [
        {
            name: "name",
            type: "string",
            required: true,
        },
    ],
    version: "1.0.0",
    description: "returns the object",
    default: ["void"],
    returns: "object",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const name = data.inside;
        if (!name &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.endsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: No Object Name Provided`);
        }
        if (!currentScope.objects[name ?? ""] &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.endsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: Invalid Object Name Provided`);
        }
        if (!currentScope.packages.includes("const UTIL = await import('util');")) {
            currentScope.packages += "const UTIL = await import('util');\n";
        }
        const res = (0, util_1.escapeResult)(`UTIL.inspect(${(0, util_1.escapeVars)(name)},{depth:null})`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope,
        };
    },
};
//# sourceMappingURL=getObject.js.map