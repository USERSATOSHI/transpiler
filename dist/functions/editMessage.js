"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$editMessage = void 0;
const _1 = require(".");
const scope_1 = require("../scope");
const transpiler_1 = require("../transpiler");
const util_1 = require("../util");
exports.$editMessage = {
    name: "$editMessage",
    type: "scope",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "channelId",
            type: "Snowflake",
            required: true,
        },
        {
            name: "messageId",
            type: "Snowflake",
            required: true,
        },
        {
            name: "content",
            type: "string",
            required: true,
        },
    ],
    code: (data, scope) => {
        const [channel, message, content] = data.splits;
        const currentScope = scope[scope.length - 1];
        const hash = Math.floor(Math.random() * 100000);
        const newscope = new scope_1.Scope(`${data.name}_${hash}`, currentScope.name, (0, util_1.parseResult)(content));
        const channelfunclist = (0, util_1.getFunctionList)(channel, Object.keys(_1.datas));
        const msgFuncList = (0, util_1.getFunctionList)((0, util_1.parseResult)(message), Object.keys(_1.datas));
        const conFunclist = (0, util_1.getFunctionList)((0, util_1.parseResult)(content), Object.keys(_1.datas));
        let executedchan;
        if (channelfunclist.length) {
            executedchan = (0, transpiler_1.Transpiler)(channel, true, {
                variables: currentScope.variables,
            });
            currentScope.functions += executedchan.scope[0].functions + "\n";
            currentScope.packages += executedchan.scope[0].packages + "\n";
            currentScope.setters += executedchan.scope[0].setters + "\n";
            currentScope.rest += executedchan.scope[0].rest + "\n";
            executedchan = executedchan.code;
            console.log({ executedchan });
        }
        else {
            executedchan = channel;
        }
        let exectedmsg;
        if (msgFuncList.length) {
            exectedmsg = (0, transpiler_1.Transpiler)(message, true, {
                name: `${data.name}_${hash}`,
                variables: currentScope.variables,
            });
            currentScope.functions += exectedmsg.scope[0].functions + "\n";
            currentScope.packages += exectedmsg.scope[0].packages + "\n";
            currentScope.setters += exectedmsg.scope[0].setters + "\n";
            currentScope.rest += exectedmsg.scope[0].rest + "\n";
            exectedmsg = exectedmsg.code;
        }
        else {
            exectedmsg = message;
        }
        let executedcon;
        if (conFunclist.length) {
            executedcon = (0, transpiler_1.Transpiler)(content, true, {
                name: `${data.name}_${hash}`,
                variables: currentScope.variables,
            });
            newscope.functions = executedcon.scope[0].functions + "\n";
            newscope.packages = executedcon.scope[0].packages + "\n";
            newscope.setters = executedcon.scope[0].setters + "\n";
            newscope.rest = executedcon.scope[0].rest + "\n";
            newscope.sendData = executedcon.scope[0].sendData;
            newscope.embeds = executedcon.scope[0].embeds;
            newscope.components = executedcon.scope[0].components;
            newscope.files = executedcon.scope[0].files;
            newscope.stickers = executedcon.scope[0].stickers;
            newscope.variables = executedcon.scope[0].variables;
        }
        else {
            executedcon = content;
            newscope.rest = exectedmsg + "\n";
            newscope.sendData.content = executedcon;
        }
        let res = newscope.toEditString(executedchan, exectedmsg);
        res += `\nawait ${newscope.name}(__$DISCORD_DATA$__);`;
        res = (0, util_1.escapeResult)(res);
        console.log({ newscope });
        currentScope.rest = currentScope.rest.replace(data.total, res);
        data.funcs = [];
        return {
            code: res,
            scope: scope,
            data,
        };
    },
};
//# sourceMappingURL=editMessage.js.map