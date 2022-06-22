"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$author = void 0;
const error_1 = require("../error");
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$author = {
    name: "$author",
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
            name: "author",
            type: "string",
            required: true,
        },
        {
            name: "iconUrl",
            type: "string",
            required: false,
        },
        {
            name: "url",
            type: "string",
            required: false,
        },
    ],
    default: ["1", "void", "", ""],
    returns: "void",
    description: "Sets the author of the embed",
    code: (data, scope) => {
        const fields = data.splits;
        const currentScope = scope[scope.length - 1];
        if (isNaN(Number(fields[0]))) {
            const author = (0, stringparser_1.parseString)(fields[0]);
            const iconUrl = fields[1] ? (0, stringparser_1.parseString)(fields[1]) : undefined;
            const url = fields[2] ? (0, stringparser_1.parseString)(fields[2]) : undefined;
            const index = 0;
            if (!currentScope.embeds[index]) {
                currentScope.embeds[index] = { fields: [] };
                currentScope.setters += `${(0, util_1.escapeVars)(`${currentScope.name}_embeds`)}[${index}] = {fields: []};\n`;
            }
            currentScope.embeds[index].author = {
                name: author,
                iconURL: iconUrl,
                url,
            };
            currentScope.rest = currentScope.rest.replace(data.total, "");
            scope[scope.length - 1] = currentScope;
            const res = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${currentScope.name}_embeds`) +
                `[${index}].author = {
          name: ${author},
          iconURL: ${iconUrl},
          url: ${url},
          }`);
            currentScope.setters += res + "\n";
            return {
                code: res,
                scope,
            };
        }
        else {
            const index = Number(fields[0]) - 1;
            if (index < 0 ||
                (index > 9 &&
                    (!currentScope.name.startsWith("$try_") ||
                        !currentScope.name.startsWith("$catch_")))) {
                throw new error_1.TranspilerError(`${data.name} requires a valid index`);
            }
            const author = (0, stringparser_1.parseString)(fields[1]);
            const iconUrl = fields[2] ? (0, stringparser_1.parseString)(fields[2]) : undefined;
            const url = fields[3] ? (0, stringparser_1.parseString)(fields[3]) : undefined;
            if (!currentScope.embeds[index]) {
                currentScope.embeds[index] = { fields: [] };
                currentScope.setters += `${(0, util_1.escapeVars)(`${currentScope.name}_embeds`)}[${index}] = {fields: []};\n`;
            }
            currentScope.embeds[index].author = {
                name: author,
                iconURL: iconUrl,
                url,
            };
            currentScope.rest = currentScope.rest.replace(data.total, "");
            const res = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${currentScope.name}_embeds`) +
                `[${index}].author = {
          name: ${author},
          iconURL: ${iconUrl},
          url: ${url},
          }`);
            currentScope.setters += res + "\n";
            scope[scope.length - 1] = currentScope;
            return {
                code: res,
                scope,
            };
        }
    },
};
//# sourceMappingURL=author.js.map