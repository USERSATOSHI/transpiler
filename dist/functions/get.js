"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$get = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
exports.$get = {
    name: "$get",
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
    default: ["void"],
    returns: "any",
    description: "Gets the value of the variable",
    code: (data, scope) => {
        let res;
        const splits = data.splits;
        const currentScope = scope[scope.length - 1];
        if (exports.$get.brackets) {
            if (!data.total.startsWith(exports.$get.name + "[") &&
                (!currentScope.name.startsWith("$try_") ||
                    !currentScope.name.startsWith("$catch_"))) {
                throw new error_1.TranspilerError(`${data.name} requires closure brackets`);
            }
        }
        if (splits.length !== 1 &&
            (!currentScope.name.startsWith("$try_") &&
                !currentScope.name.startsWith("$catch_"))) {
            throw new error_1.TranspilerError(`${data.name} requires 1 argument`);
        }
        const name = (0, util_1.removeSetFunc)(splits[0]);
        if (name === "" &&
            (!currentScope.name.startsWith("$try_") &&
                !currentScope.name.startsWith("$catch_"))) {
            throw new error_1.TranspilerError(`${data.name} requires a name`);
        }
        if (!currentScope.variables.includes(name) &&
            (!currentScope.name.startsWith("$try_") &&
                !currentScope.name.startsWith("$catch_"))) {
            console.log({ currentScope: currentScope.name });
            throw new error_1.TranspilerError(`${data.name} cannot find ${name}`);
        }
        res = `${(0, util_1.escapeResult)((0, util_1.escapeVars)(name))}`;
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return { code: res, scope: scope };
    },
};
//# sourceMappingURL=get.js.map