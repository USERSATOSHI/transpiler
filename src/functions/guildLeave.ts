import { datas } from "./";
import { Scope } from "../scope";
import { Transpiler } from "../transpiler";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult, getFunctionList } from "../util";
export const $guildLeave: FunctionData = {
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
    code: (data: funcData, scope: Scope[]) => {
        const currentScope = scope[scope.length - 1];
        const [guildId = "__$DISCORD_DATA$__.guild?.id", success, error] =
            data.splits;

        const newsuccessScope = new Scope(
            data.name,
            currentScope.name+"_success",
            success,
            true,
        );
        const newscope = new Scope(data.name, currentScope.name+"_error", error, true);

        let guildExe;
        const guildIdFunctionList = getFunctionList(
            guildId ?? "",
            Object.keys(datas),
        );
        if (guildIdFunctionList.length) {
            guildExe = Transpiler(
                guildId ?? "__$DISCORD_DATA$__.guild?.id",
                false,
                {
                    variables: currentScope.variables,
                    functions: currentScope.functions,
                    name: newsuccessScope.name,
                    objects: currentScope.objects,
                    env: currentScope.env,
                },
            ).code;
        } else {
            guildExe = guildId ?? "__$DISCORD_DATA$__.guild?.id";
        }

        let successMsg;
        const successMsgFunctionList = getFunctionList(
            success ?? "",
            Object.keys(datas),
        );
        if (successMsgFunctionList.length) {
            successMsg = Transpiler(success, true, {
                variables: currentScope.variables,
                functions: currentScope.functions,
                name: newsuccessScope.name,
                objects: currentScope.objects,
                env: [...currentScope.env,"guild"],
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
        } else {
            successMsg = success;
            newsuccessScope.rest = successMsg + "\n";
            newsuccessScope.sendData.content = successMsg ?? "";
        }

        let executedErrorMsg;
        const errorMsgFunctionList = getFunctionList(
            error ?? "",
            Object.keys(datas),
        );
        if (errorMsgFunctionList.length) {
            executedErrorMsg = Transpiler(error, true, {
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
        } else {
            executedErrorMsg = error;
            newscope.rest = executedErrorMsg + "\n";
            newscope.sendData.content = executedErrorMsg ?? "";
        }

        const res = escapeResult(
            `__$DISCORD_DATA$__.client.guilds.cache.get(${ guildExe})?.leave().then( guild => {
                ${newsuccessScope.getExecutable()}
            }).catch( guild_leave_error => {
                ${newscope.getExecutable()}
            })`,
        );
        data.funcs = [];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
            data,
        };
    },
};
