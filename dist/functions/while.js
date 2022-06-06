"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$while = void 0;
const conditionlexer_1 = require("../conditionlexer");
const error_1 = require("../error");
const util_1 = require("../util");
const _1 = require(".");
const transpiler_1 = require("../transpiler");
exports.$while = {
    name: "$while",
    type: "scope",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "condition",
            type: "string",
            required: true,
        },
        {
            name: "code",
            type: "string",
            required: true,
        },
    ],
    code: (data, scope) => {
        const splits = data.splits;
        if (data.inside?.trim() === "" || !data.inside) {
            throw new error_1.TranspilerError(`${data.name} function requires condition and code`);
        }
        if (data.splits.length < 2) {
            throw new error_1.TranspilerError(`${data.name} function requires condition and code`);
        }
        let [condition, ...code] = splits;
        const currentScope = scope[scope.length - 1];
        const conditionFunctionList = (0, util_1.getFunctionList)(condition, Object.keys(_1.datas));
        let executedCondition;
        if (conditionFunctionList.length) {
            executedCondition = (0, transpiler_1.Transpiler)(condition, false, {
                variables: currentScope.variables,
            });
            currentScope.functions += executedCondition.scope[0].functions + "\n";
            currentScope.packages += executedCondition.scope[0].packages;
            executedCondition = executedCondition.code;
        }
        else {
            executedCondition = condition;
        }
        executedCondition = (0, conditionlexer_1.conditionLexer)(executedCondition);
        executedCondition = executedCondition.solve(false);
        const hash = Math.floor(Math.random() * 100000);
        let executedCode;
        const codeFunctionList = (0, util_1.getFunctionList)(code.join(";"), Object.keys(_1.datas));
        if (codeFunctionList.length) {
            executedCode = (0, transpiler_1.Transpiler)(code.join(";"), false, {
                variables: currentScope.variables,
                embeds: currentScope.embeds,
            });
        }
        else {
            throw new error_1.TranspilerError(`${data.name} requires function in code`);
        }
        const res = (0, util_1.escapeResult)(`
while(${executedCondition}) {
  ${executedCode.scope[0].getExecutable(false)}
}
`);
        data.funcs = [];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return { code: res, scope: scope, data };
    },
};
//# sourceMappingURL=while.js.map