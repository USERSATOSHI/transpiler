"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$addButton = void 0;
const util_1 = require("util");
const discord_js_1 = require("discord.js");
const error_1 = require("../error");
const util_2 = require("../util");
const ButtonStyles = {
    primary: 1,
    secondary: 2,
    danger: 3,
    success: 4,
    link: 5,
};
const DISCORD_BUTTON_STYLE = [
    "PRIMARY",
    "SECONDARY",
    "DANGER",
    "SUCCESS",
    "LINK",
];
exports.$addButton = {
    name: "$addButton",
    brackets: false,
    optional: false,
    fields: [],
    type: "setter",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const [label, style, customId_or_url, disabled = "no", emoji] = data.splits;
        if (isNaN(Number(style)) &&
            !DISCORD_BUTTON_STYLE.includes(style) &&
            !ButtonStyles[style]) {
            throw new error_1.TranspilerError(`${data.name} style must be a number or a valid discord button style`);
        }
        const Button = new discord_js_1.ButtonBuilder();
        Button.setLabel(label)
            .setStyle(style)
            .setDisabled(disabled === "yes" || disabled === "true");
        if (style === "link" || Number(style) === 5 || style === "LINK") {
            Button.setURL(customId_or_url);
        }
        else {
            Button.setCustomId(customId_or_url);
        }
        if (emoji) {
            Button.setEmoji(emoji);
        }
        const C = (currentScope.components[currentScope.components.length - 1]);
        if (!currentScope.components.length) {
            throw new error_1.TranspilerError(`${data.name} needs an actionRow `);
        }
        if (C.components.length > 5) {
            throw new error_1.TranspilerError(`${data.name}: ActionRow cannot have more than 5 buttons`);
        }
        C.components.push(Button.toJSON());
        currentScope.components[currentScope.components.length - 1] = C;
        currentScope.rest = currentScope.rest.replace(data.total, "");
        const res = (0, util_2.escapeResult)((0, util_2.escapeVars)(`${currentScope.name}_components`) +
            `[${currentScope.components.length - 1}].components.push(${(0, util_1.inspect)(Button.toJSON(), { depth: null })});`);
        currentScope.setters += res + "\n";
        console.log({ t: data.total, r: currentScope.rest });
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=addButton.js.map