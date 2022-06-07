"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$onlyIf = void 0;
const conditionlexer_1 = require("../conditionlexer");
const error_1 = require("../error");
const scope_1 = require("../scope");
const util_1 = require("../util");
const _1 = require(".");
const transpiler_1 = require("../transpiler");
exports.$onlyIf = {
    name: "$onlyIf",
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
            name: "errorMsg",
            type: "string",
            required: false,
        },
    ],
    default: ["void", ""],
    returns: "void",
    description: "If statement",
    code: (data, scope) => {
        const splits = data.splits;
        const currentScope = scope[scope.length - 1];
        if (exports.$onlyIf.brackets) {
            if (!data.total.startsWith(exports.$onlyIf.name + "[")) {
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
        console.log({ executedCondition });
        console.log({ nested: executedCondition.nest });
        executedCondition = executedCondition.solve(true);
        console.log({ executedCondition });
        const hash = Math.floor(Math.random() * 100000);
        const newscope = new scope_1.Scope(`${data.name}_${hash}`, currentScope.name, errorMsg.join(";"), true);
        let executedErrorMsg;
        const errorMsgFunctionList = (0, util_1.getFunctionList)(errorMsg.join(";"), Object.keys(_1.datas));
        if (errorMsgFunctionList.length) {
            executedErrorMsg = (0, transpiler_1.Transpiler)(errorMsg.join(";"), true);
            newscope.functions = executedErrorMsg.scope[0].functions + "\n";
            newscope.packages = executedErrorMsg.scope[0].packages + "\n";
            newscope.setters = executedErrorMsg.scope[0].setters + "\n";
            newscope.rest = executedErrorMsg.scope[0].rest + "\n";
            newscope.sendData = executedErrorMsg.scope[0].sendData;
            newscope.embeds = executedErrorMsg.scope[0].embeds;
            newscope.components = executedErrorMsg.scope[0].components;
            newscope.files = executedErrorMsg.scope[0].files;
            newscope.stickers = executedErrorMsg.scope[0].stickers;
            newscope.variables = executedErrorMsg.scope[0].variables;
        }
        else {
            executedErrorMsg = errorMsg.join(";");
            newscope.rest = executedErrorMsg + "\n";
            newscope.sendData.content = executedErrorMsg;
        }
        newscope.addReturn = true;
        const res = (0, util_1.escapeResult)(`
    if(${executedCondition}) {
      ${newscope.getExecutable(true)}
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
//# sourceMappingURL=onlyIf.js.map