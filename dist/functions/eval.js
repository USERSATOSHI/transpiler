"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$eval = void 0;
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$eval = {
    name: "$eval",
    type: "function",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "output",
            type: "boolean",
            required: true,
        },
        {
            name: "code",
            type: "string",
            required: true,
        },
    ],
    default: ["void", "void"],
    returns: "any",
    version: "1.0.0",
    description: "Evaluates the code",
    code: (data, scope) => {
        const [output, ...code] = data.splits;
        const parsedOutput = (0, util_1.convertToBool)(output);
        const currentScope = scope[scope.length - 1];
        const hash = Math.floor(Math.random() * 100000);
        const executedCode = `Transpiler(${(0, stringparser_1.parseString)(code.join(";"))}, ${parsedOutput}, {}, false).func(__$DISCORD_DATA$__);\n`;
        const res = (0, util_1.escapeResult)(`
    ${executedCode}
    `);
        if (!currentScope.packages.includes("const { Transpiler } = await import('./transpiler.js');")) {
            currentScope.packages += `const { Transpiler } = await import('./transpiler.js');\n`;
        }
        currentScope.rest = currentScope.rest.replace(data.total, res);
        data.funcs = [];
        return {
            code: res,
            scope: scope,
            data: data,
        };
    },
};
//# sourceMappingURL=eval.js.map