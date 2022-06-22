"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isNumber = void 0;
const error_1 = require("../error");
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$isNumber = {
    name: "$isNumber",
    brackets: true,
    optional: false,
    type: "getter",
    fields: [
        {
            name: "query",
            type: "any",
            required: true,
        },
    ],
    default: ["void"],
    returns: "boolean",
    description: "Checks if the query is a number",
    code: (data, scope) => {
        let res;
        const num = data.inside;
        const currentScope = scope[scope.length - 1];
        if (!num &&
            (!currentScope.name.startsWith("$try_") &&
                !currentScope.name.startsWith("$catch_"))) {
            throw new error_1.TranspilerError(`${data.name} requires 1 argument`);
        }
        let parsedNum;
        const typedNum = (0, util_1.parseData)(num);
        if (typeof typedNum === "string") {
            parsedNum = (0, stringparser_1.parseString)(typedNum);
        }
        else
            parsedNum = typedNum;
        res = `${(0, util_1.escapeResult)(`typeof${parsedNum} === 'string' && ${parsedNum}.trim() === "" ? false : !isNaN(${parsedNum});`)}`;
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=isNumber.js.map