import { inspect } from "util";
import { TranspilerError } from "../error";
import { parseStringObject, StringObject } from "../objectParser";
import { Scope } from "../scope";
import { parseString } from "../stringparser";
import { funcData, FunctionData } from "../typings/interface";
import
{
  escapeResult,
  escapeVars,
  parseResult,
} from "../util";
export const $createObject: FunctionData = {
  name: "$createObject",
  brackets: true,
  optional: false,
  type: "setter",
  version: "1.0.0",
  fields: [
    {
      name: "name",
      type: "string",
      required: true,
    },
    {
      name: "object",
      type: "json",
      required: true,
    },
  ],
  description: "creates an Object",
  default: [ "void", "void" ],
  returns: "void",
  code: ( data: funcData, scope: Scope[] ) =>
  {
    const currentScope = scope[ scope.length - 1 ];
    const [ name, ...obj ] = data.splits;
    const parsedObj = obj.join( ";" );
    if (
      !obj.length &&
      !currentScope.name.startsWith( "$try_" ) &&
      !currentScope.name.startsWith( "$catch_" )
    )
    {
      throw new TranspilerError( `${ data.name }: No Object Provided` );
    }
    const currentObj = new StringObject( "{" );
    currentObj.addEnd( "}" );
    let object;
    try
    {
      object = parseStringObject( parsedObj, currentObj );
    } catch ( e )
    {
      throw new TranspilerError( `${ data.name }: Invalid Object Provided` );
    }
    const res = escapeResult(
      `const ${ escapeVars( name ) } =  ${ object.solve() };`,
    );
    currentScope.objects[ name ] = object;
    currentScope.setters += res + "\n";
    currentScope.rest = currentScope.rest.replace( data.total, "" );

    return {
      code: "",
      scope,
    };
  },
};
