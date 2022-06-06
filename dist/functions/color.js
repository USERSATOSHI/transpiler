"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$color = void 0;
const error_1 = require("../error");
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$color = {
    name: "$color",
    type: "setter",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "index",
            type: "number",
            required: false,
        },
        {
            name: "color",
            type: "string | number",
            required: true,
        },
    ],
    code: (data, scope) => {
        const fields = data.splits;
        const currentScope = scope[scope.length - 1];
        if (!currentScope.packages.includes("const { resolveColor } = await import('./util.js');")) {
            currentScope.packages +=
                "const { resolveColor } = await import('./util.js');\n";
        }
        if (isNaN(Number(fields[0]))) {
            const color = (0, stringparser_1.parseString)(fields[0]);
            const index = 0;
            if (!currentScope.embeds[index]) {
                currentScope.embeds[index] = { fields: [] };
                currentScope.setters += `${(0, util_1.escapeVars)(`${currentScope.name}_embeds`)}[${index}] = {fields: []};\n`;
            }
            currentScope.embeds[index].color = 1;
            currentScope.rest = currentScope.rest.replace(data.total, "");
            scope[scope.length - 1] = currentScope;
            const res = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${currentScope.name}_embeds`) +
                `[${index}].color = resolveColor(${color});`);
            currentScope.setters += res + "\n";
            return {
                code: res,
                scope,
            };
        }
        else {
            const index = Number(fields[0]) - 1;
            if (index < 0 || index > 9) {
                throw new error_1.TranspilerError(`${data.name} requires a valid index`);
            }
            const color = (0, stringparser_1.parseString)(fields[1]);
            if (!currentScope.embeds[index]) {
                currentScope.embeds[index] = { fields: [] };
                currentScope.setters += `${(0, util_1.escapeVars)(`${currentScope.name}_embeds`)}[${index}] = {fields: []};\n`;
            }
            currentScope.embeds[index].color = 1;
            currentScope.rest = currentScope.rest.replace(data.total, "");
            const res = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${currentScope.name}_embeds`) +
                `[${index}].color = resolveColor(${color});`);
            currentScope.setters += res + "\n";
            scope[scope.length - 1] = currentScope;
            return {
                code: res,
                scope,
            };
        }
    },
};
//# sourceMappingURL=color.js.map