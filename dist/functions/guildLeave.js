"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$guildLeave = void 0;
const _1 = require("./");
const scope_1 = require("../scope");
const transpiler_1 = require("../transpiler");
const util_1 = require("../util");
exports.$guildLeave = {
    name: "$guildLeave",
    brackets: true,
    optional: true,
    type: "scope",
    fields: [
        {
            name: "guildId",
            type: "Snowflake",
            required: false,
        },
        {
            name: "success",
            type: "string",
            required: false,
        },
        {
            name: "error",
            type: "string",
            required: false,
        },
    ],
    description: 'initiates a "yeet procedure" from the provided guild',
    default: ["__$DISCORD_DATA$__.guild?.id", "void", "void"],
    returns: "void",
    version: "1.0.0",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const [guildId = "__$DISCORD_DATA$__.guild?.id", success, error] = data.splits;
        const newsuccessScope = new scope_1.Scope(data.name, currentScope.name + "_success", success, true);
        const newscope = new scope_1.Scope(data.name, currentScope.name + "_error", error, true);
        let guildExe;
        const guildIdFunctionList = (0, util_1.getFunctionList)(guildId ?? "", Object.keys(_1.datas));
        if (guildIdFunctionList.length) {
            guildExe = (0, transpiler_1.Transpiler)(guildId ?? "__$DISCORD_DATA$__.guild?.id", false, {
                variables: currentScope.variables,
                functions: currentScope.functions,
                name: newsuccessScope.name,
                objects: currentScope.objects,
                env: currentScope.env,
            }).code;
        }
        else {
            guildExe = guildId ?? "__$DISCORD_DATA$__.guild?.id";
        }
        let successMsg;
        const successMsgFunctionList = (0, util_1.getFunctionList)(success ?? "", Object.keys(_1.datas));
        if (successMsgFunctionList.length) {
            successMsg = (0, transpiler_1.Transpiler)(success, true, {
                variables: currentScope.variables,
                functions: currentScope.functions,
                name: newsuccessScope.name,
                objects: currentScope.objects,
                env: [...currentScope.env, "guild"],
            });
            newsuccessScope.functions = successMsg.scope[0].functions + "\n";
            newsuccessScope.packages = successMsg.scope[0].packages + "\n";
            newsuccessScope.setters = successMsg.scope[0].setters + "\n";
            newsuccessScope.rest = successMsg.scope[0].rest + "\n";
            newsuccessScope.sendData = successMsg.scope[0].sendData;
            newsuccessScope.embeds = successMsg.scope[0].embeds;
            newsuccessScope.components = successMsg.scope[0].components;
            newsuccessScope.files = successMsg.scope[0].files;
            newsuccessScope.stickers = successMsg.scope[0].stickers;
            newsuccessScope.variables = successMsg.scope[0].variables;
        }
        else {
            successMsg = success;
            newsuccessScope.rest = successMsg + "\n";
            newsuccessScope.sendData.content = successMsg ?? "";
        }
        let executedErrorMsg;
        const errorMsgFunctionList = (0, util_1.getFunctionList)(error ?? "", Object.keys(_1.datas));
        if (errorMsgFunctionList.length) {
            executedErrorMsg = (0, transpiler_1.Transpiler)(error, true, {
                variables: currentScope.variables,
                functions: currentScope.functions,
                name: newsuccessScope.name,
                objects: currentScope.objects,
                env: [...currentScope.env, "guild_leave_error"],
            });
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
            executedErrorMsg = error;
            newscope.rest = executedErrorMsg + "\n";
            newscope.sendData.content = executedErrorMsg ?? "";
        }
        const res = (0, util_1.escapeResult)(`__$DISCORD_DATA$__.client.guilds.cache.get(${guildExe})?.leave().then( guild => {
                ${newsuccessScope.getExecutable()}
            }).catch( guild_leave_error => {
                ${newscope.getExecutable()}
            })`);
        data.funcs = [];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
            data,
        };
    },
};
//# sourceMappingURL=guildLeave.js.map