import { ActionRow, SelectMenuComponent, SelectMenuOptionBuilder, Snowflake } from "discord.js";
import { TranspilerError } from "../error";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { convertToBool, escapeResult, escapeVars } from "../util";
import { inspect } from "util";
export const $addSelectMenuOption: FunctionData = {
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
    default: [ "void", "void", "", "no", "" ],
    returns: "void",
    version: "1.0.0",
    code: ( data: funcData, scope: Scope[] ) =>
    {
        const currentScope = scope[ scope.length - 1 ];
        const [ label, value, description = "", def = "no", emoji ] = data.splits;
        if (
            ( !label || !value || label.trim() === "" || value.trim() === "" )
            && !currentScope.name.startsWith( "$try_" )
            && !currentScope.name.startsWith( "$catch_" )
        )
        {
            throw new TranspilerError( `${ data.name }: Label or Value Missing` );
        }
        const op = new SelectMenuOptionBuilder();
        op.setLabel( label ).setValue( value ).setDescription( description ).setDefault( convertToBool( def ) );
        if ( emoji )
        {
            op.setEmoji( emoji );
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
        const SM = C.components[ C.components.length - 1 ];
        SM.options.push( op.toJSON() );
        currentScope.rest = currentScope.rest.replace( data.total, "" );
        const res = escapeResult(
            escapeVars( `${ currentScope.name }_components` ) +
            `[${ currentScope.components.length - 1 }].components[0].options.push(${ inspect(
                op.toJSON(),
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