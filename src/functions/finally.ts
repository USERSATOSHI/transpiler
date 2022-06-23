import { datas } from ".";
import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { Transpiler } from "../transpiler";
import { funcData, FunctionData } from "../typings/interface";
import {
  escapeFunctionResult,
  escapeResult,
  getFunctionList,
  parseResult,
} from "../util";
export const $finally: FunctionData = {
  name: "$finally",
  brackets: true,
  optional: false,
  type: "scope",
  fields: [
    {
      name: "code",
      type: "string",
      required: true,
    },
  ],
  description: "final statement that executes after try / catch",
  default: ["void"],
  returns: "void",
  code: (data: funcData, scope: Scope[]) => {
    const code = data.inside;
    if (!code) {
      throw new TranspilerError(`${data.name}: Code Not Provided.`);
    }
    const currentScope = scope[scope.length - 1];
    const hash = Math.floor(Math.random() * 1000000);
    const newscope = new Scope(
      `${data.name}_${hash}`,
      currentScope.name,
      parseResult(code),
      true,
    );
    let codeexe;
    const funcList = getFunctionList(code, Object.keys(datas));
    if (!funcList.length) {
      throw new TranspilerError(`${data.name}: No Function Provided.`);
    }
    codeexe = Transpiler(
      code,
      true,
      {
        variables: currentScope.variables,
        embeds: currentScope.embeds,
        name: newscope.name,
        objects: currentScope.objects,
      },
      false,
    );
    newscope.functions = codeexe.scope[0].functions + "\n";
    newscope.packages = codeexe.scope[0].packages + "\n";
    newscope.setters = codeexe.scope[0].setters + "\n";
    newscope.rest = codeexe.scope[0].rest + "\n";
    newscope.sendData = codeexe.scope[0].sendData;
    newscope.embeds = codeexe.scope[0].embeds;
    newscope.components = codeexe.scope[0].components;
    newscope.files = codeexe.scope[0].files;
    newscope.stickers = codeexe.scope[0].stickers;
    newscope.variables = codeexe.scope[0].variables;

    const res = escapeResult(`try {
        ${newscope.getExecutable(true)}
    }`);
    currentScope.rest = currentScope.rest.replace(data.total, res);
    data.funcs = [];
    return {
      code: res,
      scope: scope,
      data,
    };
  },
};
