"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$else = void 0;
const error_1 = require("../error");
const scope_1 = require("../scope");
const util_1 = require("../util");
const _1 = require(".");
const transpiler_1 = require("../transpiler");
exports.$else = {
    name: "$else",
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
    code: (data, scope) => {
        const splits = data.splits;
        const currentScope = scope[scope.length - 1];
        if (exports.$else.brackets) {
            if (!data.total.startsWith(exports.$else.name + "[")) {
                throw new error_1.TranspilerError(`${data.name} requires closure brackets`);
            }
        }
        const [...errorMsg] = splits;
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
    else {
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
//# sourceMappingURL=else.js.map