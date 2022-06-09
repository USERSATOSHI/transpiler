import {
  ExecuteData,
  getFunctionData,
  getFunctionList,
  parseResult,
} from "./util";
import { datas as FunctionDatas } from "./functions/index";
import { Scope } from "./scope";
import fs from "fs";
import { minify, MinifyOutput } from "uglify-js";
import { EmbedData } from "discord.js";
import { TranspilerError } from "./error";
const functions = Object.keys(FunctionDatas ?? []);
export function Transpiler(
  code: string,
  sendMessage: boolean = true,
  scopeData?: { variables?: string[]; embeds?: EmbedData[]; name?: string , sendFunction?: string },
  uglify: boolean = false,
) {
  const flist = getFunctionList(code, functions);
  console.log({ code, flist });
  flist.forEach((x) => {
    const reg = new RegExp(`${x.replace("$", "\\$")}`, "gi");
    code = parseResult(code);
    code = code.replace(reg, x);
  });
  console.log({ code });
  const tempcode = `$EXECUTEMAINCODEFUNCTION[
        ${code}
    ]`;
  let FData = getFunctionData(tempcode, "$EXECUTEMAINCODEFUNCTION", flist);
  const globalScope = new Scope(scopeData?.name ?? "global", undefined, code);
  globalScope.addVariables(scopeData?.variables ?? []);
  globalScope.addEmbeds(scopeData?.embeds ?? []);
  console.log({ FData: FData.funcs, code, tempcode });
  globalScope.sendFunction = scopeData?.sendFunction ?? globalScope.sendFunction;
  const res = ExecuteData(parseResult(code), FData.funcs, [globalScope]);

  if (res.scope[0].sendData.content.trim() !== "") {
    ////console.log({ code: res.code });
    const scope = res.scope[0];
    scope.hasSendData = true;
    scope.rest.replace(scope.sendData.content.trim(), "");
    res.scope[0] = scope;
    //console.log({code:res.scope[0].toString()})
  }
  const str = res.scope[0].toString(sendMessage);
  const functionString = uglify ? minify(str) : str;
  console.log({ str,functionString, uglify });
  if (uglify && (<MinifyOutput>functionString).error) {
    console.log(str);
    throw new TranspilerError(
      `Failed To Transpile Code with error ${
        (<MinifyOutput>functionString).error
      }`,
    );
  }
  const func = new Function(
    "return " +
      (uglify ? (<MinifyOutput>functionString).code : <string>functionString),
  )();

  return { func, ...res };
}
