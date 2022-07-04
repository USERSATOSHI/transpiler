import { TranspilerError } from "../error";
import { StringObject, parseStringObject } from "../objectParser";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult, escapeVars } from "../util";
export const $createArray: FunctionData = {
    name: "$createArray",
    brackets: true,
    optional: false,
    type: "setter",
    fields: [
        {
            name: "varName",
            type: "string",
            required: true,
        },
        {
            name: "...elements",
            type: "any",
            required: true
        }
    ],
    description: "creates an Array",
    default: [ 'void', 'void' ],
    returns: 'void',
    version: "1.0.0",
    code: ( data: funcData, scope: Scope[] ) =>
    {
        const currentScope = scope[ scope.length - 1 ];
        const [ name, ...obj ] = data.splits;
        const parsedObj = obj.join( "," );
        if (
            !obj.length &&
            !currentScope.name.startsWith( "$try_" ) &&
            !currentScope.name.startsWith( "$catch_" )
        )
        {
            throw new TranspilerError( `${ data.name }: No Elements Provided` );
        }
        const currentObj = new StringObject( "[" );
        currentObj.addEnd( ']' );
        const object = parseStringObject( `[${ parsedObj }]`, currentObj );

        const res = escapeResult( `${ escapeVars( name ) } = ${ object.solve() };` );

        currentScope.objects[ name ] = object;
        currentScope.setters += res + "\n";
        currentScope.rest = currentScope.rest.replace( data.total, "" );

        return {
            code: "",
            scope,
        };
    },
};