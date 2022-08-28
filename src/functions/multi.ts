import { TranspilerError } from "../error";
import { FunctionData } from "../typings/interface";
import { escapeMathResult, escapeResult, parseResult } from "../util";

export const $multi: FunctionData = {
  name: "$multi",
  type: "getter",
  brackets: true,
  optional: false,
  fields: [
    {
      name: "numbers",
      type: "number",
      required: true,
    },
  ],
  version: "1.0.0",
  default: [ "void" ],
  returns: "number",
  description: "Returns the multiplication of the numbers",
  code: ( data, scope ) =>
  {
    const numbers = data.splits;
    const currentScope = scope[ scope.length - 1 ];
    if (
      data.splits.length === 0 &&
      !currentScope.name.startsWith( "$try_" ) &&
      !currentScope.name.startsWith( "$catch_" )
    )
    {
      throw new TranspilerError( `${ data.name } requires at least 1 argument` );
    }
    let multi = numbers
      .map( ( x ) =>
        x.includes( "#FUNCTION_START#" ) || x.includes( "__$DISCORD_DATA$__" ) || x.includes( "#MATH_FUNCTION_START#" )
          ? parseResult( x.trim() ) 
          : Number( x ),
      )
      .join( "*" );

    const res = ( ( escapeMathResult( `(${ multi })` ) ) );
    currentScope.rest = currentScope.rest.replace( data.total, res );
    return {
      code: res,
      scope,
    };
  },
};
