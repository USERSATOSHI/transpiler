import { conditionLexer } from "../conditionlexer";
import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult, getFunctionList } from "../util";
import { datas as funcs } from ".";
import { Transpiler } from "../transpiler";
export const $else: FunctionData = {
  name: "$else",
  brackets: true,
  optional: false,
  type: "scope",
  fields: [
    {
      name: "code",
      type: "string",
      required: false,
    },
  ],
  default: ["void"],
  returns: "void",
  description: "Else statement",
  code: (data: funcData, scope: Scope[]) => {
    const splits = data.splits;
    const currentScope = scope[scope.length - 1];
    if ($else.brackets) {
      if (
        !data.total.startsWith($else.name + "[") &&
        (!currentScope.name.startsWith("$try_") ||
          !currentScope.name.startsWith("$catch_"))
      ) {
        throw new TranspilerError(`${data.name} requires closure brackets`);
      }
    }
    const [...errorMsg] = splits;
    const hash = Math.floor(Math.random() * 100000);
    const newscope = new Scope(
      `${data.name}_${hash}`,
      currentScope.name,
      errorMsg.join(";"),
      true,
    );

    let executedErrorMsg;
    const errorMsgFunctionList = getFunctionList(
      errorMsg.join(";"),
      Object.keys(funcs),
    );
    if (errorMsgFunctionList.length) {
      executedErrorMsg = Transpiler(errorMsg.join(";"), true,{
        variables: currentScope.variables,
        embeds: currentScope.embeds,
        env: currentScope.env,
        name: currentScope.name,
        objects : currentScope.objects
      });
      newscope.functions = executedErrorMsg.scope[0].functions + "\n";
      newscope.packages = executedErrorMsg.scope[0].packages + "\n";
      newscope.setters = executedErrorMsg.scope[0].setters + "\n";
      executedErrorMsg.scope[0].addReturn = true;
      newscope.rest = executedErrorMsg.scope[0].rest + "\n";
      newscope.sendData = executedErrorMsg.scope[0].sendData;
    } else {
      executedErrorMsg = errorMsg.join(";");
      newscope.rest = executedErrorMsg + "\n";
      newscope.sendData.content = executedErrorMsg;
    }
    const res = escapeResult(`
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
