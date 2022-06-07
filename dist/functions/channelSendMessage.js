"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$channelSendMessage = void 0;
const _1 = require(".");
const scope_1 = require("../scope");
const transpiler_1 = require("../transpiler");
const util_1 = require("../util");
exports.$channelSendMessage = {
    name: "$channelSendMessage",
    type: "scope_getter",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "channel",
            type: "Snowflake",
            required: true,
        },
        {
            name: "message",
            type: "string",
            required: true,
        },
        {
            name: "output",
            type: "boolean",
            required: false,
        },
    ],
    default: ["void", "void", "no"],
    returns: "?string",
    description: "Sends a message to a channel",
    code: (data, scope) => {
        const [channel, message, output = "no"] = data.splits;
        const parsedOutput = (0, util_1.convertToBool)(output);
        const currentScope = scope[scope.length - 1];
        const hash = Math.floor(Math.random() * 100000);
        const newscope = new scope_1.Scope(`${data.name}_${hash}`, currentScope.name, (0, util_1.parseResult)(message));
        const channelfunclist = (0, util_1.getFunctionList)(channel, Object.keys(_1.datas));
        const msgFuncList = (0, util_1.getFunctionList)((0, util_1.parseResult)(message), Object.keys(_1.datas));
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
            newscope.functions = exectedmsg.scope[0].functions + "\n";
            newscope.packages = exectedmsg.scope[0].packages + "\n";
            newscope.setters = exectedmsg.scope[0].setters + "\n";
            newscope.rest = exectedmsg.scope[0].rest + "\n";
            newscope.sendData = exectedmsg.scope[0].sendData;
            newscope.embeds = exectedmsg.scope[0].embeds;
            newscope.components = exectedmsg.scope[0].components;
            newscope.files = exectedmsg.scope[0].files;
            newscope.stickers = exectedmsg.scope[0].stickers;
            newscope.variables = exectedmsg.scope[0].variables;
        }
        else {
            exectedmsg = message;
            newscope.rest = exectedmsg + "\n";
            newscope.sendData.content = exectedmsg;
        }
        newscope.useChannel = executedchan;
        newscope.addReturn = parsedOutput;
        let res = (0, util_1.escapeResult)(newscope.toString(true));
        console.log({ newscope });
        currentScope.functions += res + "\n";
        res = (0, util_1.escapeResult)(`(await ${newscope.name}(__$DISCORD_DATA$__))?.id`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        data.funcs = [];
        return {
            code: res,
            scope: scope,
            data,
        };
    },
};
//# sourceMappingURL=channelSendMessage.js.map