"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$image = void 0;
const error_1 = require("../error");
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$image = {
    name: "$image",
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
            name: "url",
            type: "string",
            required: true,
        },
    ],
    version: "1.0.0",
    default: ["1", "void"],
    returns: "void",
    description: "Sets the image of the embed",
    code: (data, scope) => {
        const fields = data.splits;
        const currentScope = scope[scope.length - 1];
        if (isNaN(Number(fields[0]))) {
            const url = (0, stringparser_1.parseString)(fields.join(";"));
            const index = 0;
            if (!currentScope.embeds[index]) {
                currentScope.embeds[index] = { fields: [] };
                currentScope.setters += `${(0, util_1.escapeVars)(`${currentScope.name}_embeds`)}[${index}] = {fields: []};\n`;
            }
            currentScope.embeds[index].image = { url };
            currentScope.rest = currentScope.rest.replace(data.total, "");
            scope[scope.length - 1] = currentScope;
            const res = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${currentScope.name}_embeds`) +
                `[${index}].image = {
            url: ${url},
          };`);
            currentScope.setters += res + "\n";
            return {
                code: res,
                scope,
            };
        }
        else {
            const index = Number(fields.shift()) - 1;
            if (index < 0 ||
                (index > 9 &&
                    (!currentScope.name.startsWith("$try_") ||
                        !currentScope.name.startsWith("$catch_")))) {
                throw new error_1.TranspilerError(`${data.name} requires a valid index`);
            }
            const url = (0, stringparser_1.parseString)(fields.join(";"));
            if (!currentScope.embeds[index]) {
                currentScope.embeds[index] = { fields: [] };
                currentScope.setters += `${(0, util_1.escapeVars)(`${currentScope.name}_embeds`)}[${index}] = {fields: []};\n`;
            }
            currentScope.embeds[index].color = 1;
            currentScope.rest = currentScope.rest.replace(data.total, "");
            const res = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${currentScope.name}_embeds`) +
                `[${index}].image = {
            url: ${url},
          };`);
            currentScope.setters += res + "\n";
            scope[scope.length - 1] = currentScope;
            return {
                code: res,
                scope,
            };
        }
    },
};
//# sourceMappingURL=image.js.map