"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$elseIf = void 0;
const conditionlexer_1 = require("../conditionlexer");
const error_1 = require("../error");
const scope_1 = require("../scope");
const util_1 = require("../util");
const _1 = require(".");
const transpiler_1 = require("../transpiler");
exports.$elseIf = {
    name: "$elseIf",
    brackets: true,
    optional: false,
    type: "scope",
    fields: [
        {
            name: "condition",
            type: "string",
            required: true,
        },
        {
            name: "code",
            type: "string",
            required: false,
        },
    ],
    default: ["void", ""],
    returns: "void",
    description: "Else if statement",
    code: (data, scope) => {
        const splits = data.splits;
        const currentScope = scope[scope.length - 1];
        if (exports.$elseIf.brackets) {
            if (!data.total.startsWith(exports.$elseIf.name + "[")) {
                throw new error_1.TranspilerError(`${data.name} requires closure brackets`);
            }
        }
        const [condition, ...errorMsg] = splits;
        const conditionFunctionList = (0, util_1.getFunctionList)(condition, Object.keys(_1.datas));
        let executedCondition;
        if (conditionFunctionList.length) {
            executedCondition = (0, transpiler_1.Transpiler)(condition, false, { variables: currentScope.variables });
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
        const newscope = new scope_1.Scope(`${data.name}_${hash}`, currentScope.name, errorMsg.join(";"), true);
        let executedErrorMsg;
        const errorMsgFunctionList = (0, util_1.getFunctionList)(errorMsg.join(";"), Object.keys(_1.datas));
        if (errorMsgFunctionList.length) {
            executedErrorMsg = (0, transpiler_1.Transpiler)(errorMsg.join(";"), true, {
                variables: currentScope.variables,
                embeds: currentScope.embeds,
            });
            newscope.functions = executedErrorMsg.scope[0].functions + "\n";
            newscope.packages = executedErrorMsg.scope[0].packages + "\n";
            newscope.setters = executedErrorMsg.scope[0].setters + "\n";
            executedErrorMsg.scope[0].addReturn = true;
            newscope.rest = executedErrorMsg.scope[0].rest + "\n";
            newscope.sendData = executedErrorMsg.scope[0].sendData;
        }
        else {
            executedErrorMsg = errorMsg.join(";");
            newscope.rest = executedErrorMsg + "\n";
            newscope.sendData.content = executedErrorMsg;
        }
        const res = (0, util_1.escapeResult)(`
    else if(${executedCondition}) {
      ${newscope.getExecutable()}
    }
    `);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
            data,
        };
    },
};
//# sourceMappingURL=elseIf.js.map