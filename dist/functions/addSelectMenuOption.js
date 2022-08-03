"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$addSelectMenuOption = void 0;
const discord_js_1 = require("discord.js");
const error_1 = require("../error");
const util_1 = require("../util");
const util_2 = require("util");
exports.$addSelectMenuOption = {
    name: "$addSelectMenuOption",
    brackets: true,
    optional: false,
    type: "setter",
    fields: [
        {
            name: "label",
            type: "string",
            required: true,
        },
        {
            name: "value",
            type: "string",
            required: true,
        },
        {
            name: "description",
            type: "string",
            required: false,
        },
        {
            name: "def",
            type: "boolean",
            required: false,
        },
        {
            name: "emoji",
            type: "EmojiResolvable",
            required: false,
        },
    ],
    description: "adds an option to SelectMenu",
    default: ["void", "void", "", "no", ""],
    returns: "void",
    version: "1.0.0",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const [label, value, description = "", def = "no", emoji] = data.splits;
        if ((!label || !value || label.trim() === "" || value.trim() === "")
            && !currentScope.name.startsWith("$try_")
            && !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: Label or Value Missing`);
        }
        const op = new discord_js_1.SelectMenuOptionBuilder();
        op.setLabel(label).setValue(value).setDescription(description).setDefault((0, util_1.convertToBool)(def));
        if (emoji) {
            op.setEmoji(emoji);
        }
        const C = (currentScope.components[currentScope.components.length - 1]);
        if (!currentScope.components.length &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: needs an actionRow `);
        }
        if (C.components.length > 5 &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: ActionRow cannot have more than 5 buttons`);
        }
        const SM = C.components[C.components.length - 1];
        SM.options.push(op.toJSON());
        currentScope.rest = currentScope.rest.replace(data.total, "");
        const res = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${currentScope.name}_components`) +
            `[${currentScope.components.length - 1}].components[0].options.push(${(0, util_2.inspect)(op.toJSON(), { depth: null })});`);
        currentScope.setters += res + "\n";
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=addSelectMenuOption.js.map