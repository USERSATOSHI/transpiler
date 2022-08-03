"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$env = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
exports.$env = {
    name: "$env",
    brackets: true,
    optional: false,
    type: "getter",
    fields: [
        {
            name: "env",
            type: "string",
            required: true,
        },
    ],
    description: "",
    default: ["void"],
    version: "1.0.0",
    returns: "?string",
    code: (data, scope) => {
        const env = data.inside;
        const currentScope = scope[scope.length - 1];
        if (!env &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: ENV Not Provided.`);
        }
        const mainenv = env?.split(".")[0];
        if (!currentScope.env.includes(mainenv) &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: ENV ${env} Not Found`);
        }
        const res = (0, util_1.escapeResult)(`${env}`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope,
        };
    },
};
//# sourceMappingURL=env.js.map