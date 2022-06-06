"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$addField = void 0;
const error_1 = require("../error");
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$addField = {
    name: "$addField",
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
            name: "name",
            type: "string",
            required: true,
        },
        {
            name: "value",
            type: "string",
            required: true,
        },
        {
            name: "inline",
            type: "boolean",
            required: false,
        },
    ],
    code: (data, scope) => {
        const fields = data.splits;
        const currentScope = scope[scope.length - 1];
        if (isNaN(Number(fields[0]))) {
            let name = (0, stringparser_1.parseString)(fields[0]);
            let value = (0, stringparser_1.parseString)(fields[1]);
            let inline = (0, util_1.convertToBool)(fields[2]);
            const index = 0;
            if (!currentScope.embeds[index]) {
                currentScope.embeds[index] = { fields: [] };
                currentScope.setters += `${(0, util_1.escapeVars)(`${currentScope.name}_embeds`)}[${index}] = {fields: []};\n`;
            }
            if (!currentScope.embeds[index].fields) {
                currentScope.embeds[index].fields = [];
                currentScope.setters += `${(0, util_1.escapeVars)(`${currentScope.name}_embeds`)}[${index}].fields = [];\n`;
            }
            currentScope.embeds[index].fields.push({
                name,
                value,
                inline,
            });
            currentScope.rest = currentScope.rest.replace(data.total, "");
            const res = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${currentScope.name}_embeds`) +
                `[${index}].fields.push({
        name: ${name},
        value: ${value},
        inline: ${inline},
          })`);
            currentScope.setters += res + "\n";
            scope[scope.length - 1] = currentScope;
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
            let name = (0, stringparser_1.parseString)(fields[1]);
            let value = (0, stringparser_1.parseString)(fields[2]);
            let inline = (0, util_1.convertToBool)(fields[3]);
            if (!currentScope.embeds[index]) {
                currentScope.embeds[index] = { fields: [] };
                currentScope.setters += `${(0, util_1.escapeVars)(`${currentScope.name}_embeds`)}[${index}] = {fields: []};\n`;
            }
            if (!currentScope.embeds[index].fields)
                currentScope.embeds[index].fields = [];
            currentScope.embeds[index].fields?.push({
                name,
                value,
                inline,
            });
            const res = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${currentScope.name}_embeds`) +
                `[${index}].fields.push({
        name: ${name},
        value: ${value},
        inline: ${inline},
          })`);
            currentScope.setters += res + "\n";
            currentScope.rest = currentScope.rest.replace(data.total, "");
            scope[scope.length - 1] = currentScope;
            return {
                code: res,
                scope,
            };
        }
    },
};
//# sourceMappingURL=addField.js.map