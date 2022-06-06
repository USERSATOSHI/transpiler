import { datas } from ".";
import { Scope } from "../scope";
import { Transpiler } from "../transpiler";
import { funcData, FunctionData } from "../typings/interface";
import {
  convertToBool,
  escapeFunctionResult,
  escapeResult,
  getFunctionList,
  parseResult,
} from "../util";

export const $channelSendMessage: FunctionData = {
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
  code: (data: funcData, scope: Scope[]) => {
    const [channel, message, output = "no"] = data.splits;
    const parsedOutput = convertToBool(output);
    const currentScope = scope[scope.length - 1];
    const hash = Math.floor(Math.random() * 100000);
    const newscope = new Scope(
      `${data.name}_${hash}`,
      currentScope.name,
      parseResult(message),
    );
    const channelfunclist = getFunctionList(channel, Object.keys(datas));
    const msgFuncList = getFunctionList(
      parseResult(message),
      Object.keys(datas),
    );
    let executedchan;
    if (channelfunclist.length) {
      executedchan = Transpiler(channel, true, {
        variables: currentScope.variables,
      });
      currentScope.functions += executedchan.scope[0].functions + "\n";
      currentScope.packages += executedchan.scope[0].packages + "\n";
      currentScope.setters += executedchan.scope[0].setters + "\n";
      currentScope.rest += executedchan.scope[0].rest + "\n";
      executedchan = executedchan.code;
      console.log({ executedchan });
    } else {
      executedchan = channel;
    }
    let exectedmsg;
    if (msgFuncList.length) {
      exectedmsg = Transpiler(message, true, {
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
    } else {
      exectedmsg = message;
      newscope.rest = exectedmsg + "\n";
      newscope.sendData.content = exectedmsg;
    }
    newscope.useChannel = executedchan;
    newscope.addReturn = parsedOutput;
    let res = escapeResult(newscope.toString(true));
    console.log({ newscope });
    currentScope.functions += res + "\n";
    res = escapeResult(`(await ${newscope.name}(__$DISCORD_DATA$__))?.id`);
    currentScope.rest = currentScope.rest.replace(data.total, res);
    data.funcs = [];
    return {
      code: res,
      scope: scope,
      data,
    };
  },
};
