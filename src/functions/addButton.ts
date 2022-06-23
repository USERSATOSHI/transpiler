import { inspect } from "util";
import {
  ActionRow,
  ButtonBuilder,
  ButtonStyle,
  ButtonComponent,
} from "discord.js";
import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult, escapeVars } from "../util";
const ButtonStyles: Record<string, number> = {
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
export const $addButton: FunctionData = {
  name: "$addButton",
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
  code: (data: funcData, scope: Scope[]) => {
    const currentScope = scope[scope.length - 1];
    const [label, style, customId_or_url, disabled = "no", emoji] = data.splits;
    if (
      isNaN(Number(style)) &&
      !DISCORD_BUTTON_STYLE.includes(style) &&
      !ButtonStyles[style] &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(
        `${data.name} style must be a number or a valid discord button style`,
      );
    }
    const Button = new ButtonBuilder();
    Button.setLabel(label)
      .setStyle(<ButtonStyle>(<unknown>style))
      .setDisabled(disabled === "yes" || disabled === "true");
    if (style === "link" || Number(style) === 5 || style === "LINK") {
      Button.setURL(customId_or_url);
    } else {
      Button.setCustomId(customId_or_url);
    }

    if (emoji) {
      Button.setEmoji(emoji);
    }

    const C = <ActionRow<ButtonComponent>>(
      currentScope.components[currentScope.components.length - 1]
    );

    if (
      !currentScope.components.length &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(`${data.name} needs an actionRow `);
    }

    if (
      C.components.length > 5 &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(
        `${data.name}: ActionRow cannot have more than 5 buttons`,
      );
    }

    C.components.push(<ButtonComponent>Button.toJSON());
    currentScope.components[currentScope.components.length - 1] = C;
    currentScope.rest = currentScope.rest.replace(data.total, "");
    const res = escapeResult(
      escapeVars(`${currentScope.name}_components`) +
        `[${currentScope.components.length - 1}].components.push(${inspect(
          Button.toJSON(),
          { depth: null },
        )});`,
    );
    currentScope.setters += res + "\n";
    return {
      code: res,
      scope: scope,
    };
  },
};
