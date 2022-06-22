"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$let = void 0;
const error_1 = require("../error");
const stringparser_1 = require("../stringparser");
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
    default: ["void", "void"],
    returns: "void",
    description: "Sets the value of the variable",
    code: (data, scope) => {
        let res;
        const splits = data.splits;
        const currentScope = scope[scope.length - 1];
        if (exports.$let.brackets) {
            if (!data.total.startsWith(exports.$let.name + "[") &&
                (!currentScope.name.startsWith("$try_") ||
                    !currentScope.name.startsWith("$catch_"))) {
                throw new error_1.TranspilerError(`${data.name} requires closure brackets`);
            }
        }
        if (splits.length !== 2 &&
            (!currentScope.name.startsWith("$try_") &&
                !currentScope.name.startsWith("$catch_"))) {
            throw new error_1.TranspilerError(`${data.name} requires 2 arguments`);
        }
        const name = (0, util_1.removeSetFunc)(splits[0]);
        let value = (0, util_1.parseData)((0, util_1.removeSetFunc)(splits[1]));
        if (typeof value === "string" && value.includes("#FUNCTION_START#")) {
            value = (0, stringparser_1.parseString)(value);
        }
        if (name === "" &&
            (!currentScope.name.startsWith("$try_") &&
                !currentScope.name.startsWith("$catch_"))) {
            throw new error_1.TranspilerError(`${data.name} requires a name`);
        }
        if (name === value &&
            (!currentScope.name.startsWith("$try_") &&
                !currentScope.name.startsWith("$catch_"))) {
            throw new error_1.TranspilerError(`${data.name} cannot be used to set itself`);
        }
        if (currentScope.variables.includes(name)) {
            if (currentScope.variables.includes((0, util_1.parseResult)(value)) ||
                value.toString().startsWith("#FUNCTION_START#") ||
                (value.toString().startsWith("`") && value.toString().endsWith("`"))) {
                res = `${(0, util_1.escapeVars)(name)} = ${value};`;
            }
            else {
                res = `${(0, util_1.escapeVars)(name)} = \`${value}\`;`;
            }
        }
        else {
            if (typeof value !== "string" ||
                currentScope.variables.includes((0, util_1.parseResult)(value.toString())) ||
                value.toString().startsWith("#FUNCTION_START#") ||
                (value.toString().startsWith("`") && value.toString().endsWith("`"))) {
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