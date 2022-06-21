"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transpiler = void 0;
const util_1 = require("./util");
const index_1 = require("./functions/index");
const scope_1 = require("./scope");
const uglify_js_1 = require("uglify-js");
const error_1 = require("./error");
const functions = Object.keys(index_1.datas ?? []);
function Transpiler(code, sendMessage = true, scopeData, uglify = false) {
    const flist = (0, util_1.getFunctionList)(code, functions);
    flist.forEach((x) => {
        const reg = new RegExp(`${x.replace("$", "\\$")}`, "gi");
        code = (0, util_1.parseResult)(code);
        code = code.replace(reg, x);
    });
    const tempcode = `$EXECUTEMAINCODEFUNCTION[
        ${code}
    ]`;
    let FData = (0, util_1.getFunctionData)(tempcode, "$EXECUTEMAINCODEFUNCTION", flist);
    const globalScope = new scope_1.Scope(scopeData?.name ?? "global", undefined, code);
    globalScope.addVariables(scopeData?.variables ?? []);
    globalScope.addEmbeds(scopeData?.embeds ?? []);
    globalScope.sendFunction = scopeData?.sendFunction ?? globalScope.sendFunction;
    const res = (0, util_1.ExecuteData)((0, util_1.parseResult)(code), FData.funcs, [globalScope]);
    if (res.scope[0].sendData.content.trim() !== "") {
        const scope = res.scope[0];
        scope.hasSendData = true;
        scope.rest.replace(scope.sendData.content.trim(), "");
        res.scope[0] = scope;
    }
    const str = res.scope[0].toString(sendMessage);
    const functionString = uglify ? (0, uglify_js_1.minify)(str) : str;
    if (uglify && functionString.error) {
        throw new error_1.TranspilerError(`code:${str} 
<------------------------------------------------------->
      Failed To Transpile Code with error ${functionString.error}`);
    }
    const func = new Function("return " +
        (uglify ? functionString.code : functionString))();
    return { func, ...res };
}
exports.Transpiler = Transpiler;
//# sourceMappingURL=transpiler.js.map