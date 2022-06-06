"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$description = void 0;
const error_1 = require("../error");
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$description = {
    name: "$description",
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
            name: "text",
            type: "string",
            required: true,
        },
    ],
    code: (data, scope) => {
        const fields = data.splits;
        const currentScope = scope[scope.length - 1];
        if (isNaN(Number(fields[0]))) {
            const text = (0, stringparser_1.parseString)(fields.join(";"));
            const index = 0;
            if (!currentScope.embeds[index]) {
                currentScope.embeds[index] = { fields: [] };
                currentScope.setters += `${(0, util_1.escapeVars)(`${currentScope.name}_embeds`)}[${index}] = {fields: []};\n`;
            }
            currentScope.embeds[index].color = 1;
            currentScope.rest = currentScope.rest.replace(data.total, "");
            scope[scope.length - 1] = currentScope;
            const res = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${currentScope.name}_embeds`) +
                `[${index}].description = ${text};`);
            currentScope.setters += res + "\n";
            return {
                code: res,
                scope,
            };
        }
        else {
            const index = Number(fields.shift()) - 1;
            if (index < 0 || index > 9) {
                throw new error_1.TranspilerError(`${data.name} requires a valid index`);
            }
            const text = (0, stringparser_1.parseString)(fields.join(";"));
            if (!currentScope.embeds[index]) {
                currentScope.embeds[index] = { fields: [] };
                currentScope.setters += `${(0, util_1.escapeVars)(`${currentScope.name}_embeds`)}[${index}] = {fields: []};\n`;
            }
            currentScope.embeds[index].color = 1;
            currentScope.rest = currentScope.rest.replace(data.total, "");
            const res = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${currentScope.name}_embeds`) +
                `[${index}].description = ${text};`);
            currentScope.setters += res + "\n";
            scope[scope.length - 1] = currentScope;
            return {
                code: res,
                scope,
            };
        }
    },
};
//# sourceMappingURL=description.js.map