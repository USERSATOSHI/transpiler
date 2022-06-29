"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$finally = void 0;
const _1 = require(".");
const error_1 = require("../error");
const scope_1 = require("../scope");
const transpiler_1 = require("../transpiler");
const util_1 = require("../util");
exports.$finally = {
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
    version: "1.0.0",
    description: "final statement that executes after try / catch",
    default: ["void"],
    returns: "void",
    code: (data, scope) => {
        const code = data.inside;
        if (!code) {
            throw new error_1.TranspilerError(`${data.name}: Code Not Provided.`);
        }
        const currentScope = scope[scope.length - 1];
        const hash = Math.floor(Math.random() * 1000000);
        const newscope = new scope_1.Scope(`${data.name}_${hash}`, currentScope.name, (0, util_1.parseResult)(code), true);
        let codeexe;
        const funcList = (0, util_1.getFunctionList)(code, Object.keys(_1.datas));
        if (!funcList.length) {
            throw new error_1.TranspilerError(`${data.name}: No Function Provided.`);
        }
        codeexe = (0, transpiler_1.Transpiler)(code, true, {
            variables: currentScope.variables,
            embeds: currentScope.embeds,
            name: newscope.name,
            objects: currentScope.objects,
        }, false);
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
        const res = (0, util_1.escapeResult)(`try {
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
//# sourceMappingURL=finally.js.map