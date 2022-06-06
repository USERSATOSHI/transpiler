"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$let = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
exports.$let = {
    name: "$let",
    brackets: true,
    optional: false,
    type: "setter",
    fields: [
        {
            name: "name",
            type: "string",
            required: true,
        },
        {
            name: "value",
            type: "string",
            required: true,
        },
    ],
    code: (data, scope) => {
        let res;
        const splits = data.splits;
        if (exports.$let.brackets) {
            if (!data.total.startsWith(exports.$let.name + "[")) {
                throw new error_1.TranspilerError(`${data.name} requires closure brackets`);
            }
        }
        console.log({ letData: data });
        if (splits.length !== 2) {
            throw new error_1.TranspilerError(`${data.name} requires 2 arguments`);
        }
        const name = (0, util_1.removeSetFunc)(splits[0]);
        const value = (0, util_1.parseData)((0, util_1.removeSetFunc)(splits[1]));
        if (name === "") {
            throw new error_1.TranspilerError(`${data.name} requires a name`);
        }
        if (name === value) {
            throw new error_1.TranspilerError(`${data.name} cannot be used to set itself`);
        }
        const currentScope = scope[scope.length - 1];
        if (currentScope.variables.includes(name)) {
            if (currentScope.variables.includes((0, util_1.parseResult)(value)) ||
                value.startsWith("#FUNCTION_START#")) {
                res = `${(0, util_1.escapeVars)(name)} = ${value};`;
            }
            else {
                res = `${(0, util_1.escapeVars)(name)} = \`${value}\`;`;
            }
        }
        else {
            if (typeof value !== "string" ||
                currentScope.variables.includes((0, util_1.parseResult)(value.toString())) ||
                value.toString().startsWith("#FUNCTION_START#")) {
                res = `let ${(0, util_1.escapeVars)(name)} = ${value};`;
            }
            else {
                res = `let ${(0, util_1.escapeVars)(name)} = \`${value}\`;`;
            }
        }
        currentScope.variables.push(name);
        currentScope.setters += (0, util_1.escapeResult)(res) + "\n";
        currentScope.rest = currentScope.rest.replace((0, util_1.removeSetFunc)(data.total).replaceAll("#FUNCTION_SEPARATOR", ";"), "");
        scope[scope.length - 1] = currentScope;
        return { code: "", scope: scope };
    },
};
//# sourceMappingURL=let.js.map