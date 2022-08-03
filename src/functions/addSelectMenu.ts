import { inspect } from "util";
import
  {
    ActionRow,
    SelectMenuComponent,
  } from "discord.js";
import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { convertToBool, escapeResult, escapeVars } from "../util";
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
export const $addSelectMenu: FunctionData = {
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
  default: [ "", "void", "void", "no", "" ],
  version: "1.0.0",
  description: "Adds a button to the ActionRow",
  returns: "void",
  type: "setter",
  code: ( data: funcData, scope: Scope[] ) =>
  {
    const currentScope = scope[ scope.length - 1 ];
    const [ customId, placeholder, min_values, max_values, disabled = "no" ] = data.splits;
    if (
      ( !customId || customId === "" ) &&
      !currentScope.name.startsWith( "$try_" ) &&
      !currentScope.name.startsWith( "$catch_" )
    )
    {
      throw new TranspilerError(
        `${ data.name }: CustomID not Provided`,
      );
    }
    const menu = {
      type: 3,
      custom_id: customId,
      placeholder: placeholder,
      min_values: Number( min_values ),
      max_values: Number( max_values ),
      options: [],
      disabled: convertToBool( disabled ),
    }

    const C = <ActionRow<SelectMenuComponent>>(
      currentScope.components[ currentScope.components.length - 1 ]
    );

    if (
      !currentScope.components.length &&
      !currentScope.name.startsWith( "$try_" ) &&
      !currentScope.name.startsWith( "$catch_" )
    )
    {
      throw new TranspilerError( `${ data.name }: needs an actionRow ` );
    }

    if (
      C.components.length > 5 &&
      !currentScope.name.startsWith( "$try_" ) &&
      !currentScope.name.startsWith( "$catch_" )
    )
    {
      throw new TranspilerError(
        `${ data.name }: ActionRow cannot have more than 5 buttons`,
      );
    }

    C.components.push( <SelectMenuComponent><unknown>menu );
    currentScope.components[ currentScope.components.length - 1 ] = C;
    currentScope.rest = currentScope.rest.replace( data.total, "" );
    const res = escapeResult(
      escapeVars( `${ currentScope.name }_components` ) +
      `[${ currentScope.components.length - 1 }].components.push(${ inspect(
        menu,
        { depth: null },
      ) });`,
    );
    currentScope.setters += res + "\n";
    return {
      code: res,
      scope: scope,
    };
  },
};
