"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$addSelectMenu = void 0;
const util_1 = require("util");
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
exports.$addSelectMenu = {
    name: "$addSelectMenu",
    brackets: false,
    optional: false,
    fields: [
        {
            name: "label",
            type: "string",
            required: false,
        },
        {
            name: "style",
            type: "string | number",
            required: true,
        },
        {
            name: "customId | url",
            type: "string",
            required: true,
        },
        {
            name: "disabled",
            type: "boolean",
            required: false,
        },
        {
            name: "emoji",
            type: "string",
            required: false,
        },
    ],
    default: ["", "void", "void", "no", ""],
    version: "1.0.0",
    description: "Adds a button to the ActionRow",
    returns: "void",
    type: "setter",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const [customId, placeholder, min_values, max_values, disabled = "no"] = data.splits;
        if ((!customId || customId === "") &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name}: CustomID not Provided`);
        }
        const menu = {
            type: 3,
            custom_id: customId,
            placeholder: placeholder,
            min_values: Number(min_values),
            max_values: Number(max_values),
            options: [],
            disabled: (0, util_2.convertToBool)(disabled),
        };
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
        C.components.push(menu);
        currentScope.components[currentScope.components.length - 1] = C;
        currentScope.rest = currentScope.rest.replace(data.total, "");
        const res = (0, util_2.escapeResult)((0, util_2.escapeVars)(`${currentScope.name}_components`) +
            `[${currentScope.components.length - 1}].components.push(${(0, util_1.inspect)(menu, { depth: null })});`);
        currentScope.setters += res + "\n";
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=addSelectMenu.js.map