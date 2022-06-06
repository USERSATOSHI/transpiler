import { datas } from ".";
import { Scope } from "../scope";
import { parseString } from "../stringparser";
import { Transpiler } from "../transpiler";
import { funcData, FunctionData } from "../typings/interface";
import {
  convertToBool,
  escapeFunctionResult,
  escapeResult,
  getFunctionList,
  parseResult,
} from "../util";

export const $editMessage: FunctionData = {
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
  code: (data: funcData, scope: Scope[]) => {
    const [channel, message, content] = data.splits;
    const currentScope = scope[scope.length - 1];
    const hash = Math.floor(Math.random() * 100000);
    const newscope = new Scope(
      `${data.name}_${hash}`,
      currentScope.name,
      parseResult(content),
    );
    const channelfunclist = getFunctionList(channel, Object.keys(datas));
    const msgFuncList = getFunctionList(
      parseResult(message),
      Object.keys(datas),
    );
    const conFunclist = getFunctionList(
      parseResult(content),
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
      currentScope.functions += exectedmsg.scope[0].functions + "\n";
      currentScope.packages += exectedmsg.scope[0].packages + "\n";
      currentScope.setters += exectedmsg.scope[0].setters + "\n";
      currentScope.rest += exectedmsg.scope[0].rest + "\n";
      exectedmsg = exectedmsg.code;
    } else {
      exectedmsg = message;
    }
    let executedcon;
    if (conFunclist.length) {
      executedcon = Transpiler(content, true, {
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
    } else {
      executedcon = content;
      newscope.rest = exectedmsg + "\n";
      newscope.sendData.content = executedcon;
    }
    let res = newscope.toEditString(executedchan, exectedmsg);
    res += `\nawait ${newscope.name}(__$DISCORD_DATA$__);`;
    res = escapeResult(res);
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
