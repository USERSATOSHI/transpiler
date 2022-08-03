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
import { StringObject } from "./objectParser";
import fixMath from "./mathlexer";
const functions = Object.keys(FunctionDatas ?? []);
export function Transpiler(
  code: string,
  sendMessage: boolean = true,
  scopeData?: {
    variables?: string[];
    embeds?: EmbedData[];
    name?: string;
    sendFunction?: string;
    functions?: string;
    env?: string[];
    objects?: Record<string, StringObject>;
  },
  uglify: boolean = false,
) {
  const flist = getFunctionList(code, functions);

  flist.forEach((x) => {
    const reg = new RegExp(`${x.replace("$", "\\$")}`, "gi");
    code = parseResult(code);
    code = code.replace(reg, x);
  });

  const tempcode = `$EXECUTEMAINCODEFUNCTION[
        ${code}
    ]`;
  let FData = getFunctionData(tempcode, "$EXECUTEMAINCODEFUNCTION", flist);
  const globalScope = new Scope(scopeData?.name ?? "global", undefined, code);
  globalScope.addVariables(scopeData?.variables ?? []);
  globalScope.addEmbeds(scopeData?.embeds ?? []);
  globalScope.env.push(...(scopeData?.env ?? []));
  globalScope.objects = {...globalScope.objects,...scopeData?.objects}

  globalScope.sendFunction =
    scopeData?.sendFunction ?? globalScope.sendFunction;
  const res = ExecuteData(parseResult(code), FData.funcs, [globalScope]);

  if (res.scope[0].sendData.content.trim() !== "") {
    const scope = res.scope[0];
    scope.hasSendData = true;
    scope.rest.replace(scope.sendData.content.trim(), "");
    res.scope[0] = scope;
  }
  let str = res.scope[ 0 ].toString( sendMessage );
  str = fixMath( str );
  const functionString = uglify ? minify(str) : str;

  if (uglify && (<MinifyOutput>functionString).error) {
    throw new TranspilerError(
      `code:${str} 
<------------------------------------------------------->
      Failed To Transpile Code with error ${
        (<MinifyOutput>functionString).error
      }`,
    );
  }
  let func;
  try
  {
    func = new Function(
      "return " +
      ( uglify ? ( <MinifyOutput> functionString ).code : <string> functionString ),
    )();
  } catch ( e:any )
  {
    throw new TranspilerError( e );
  }

  return { func, ...res };
}
