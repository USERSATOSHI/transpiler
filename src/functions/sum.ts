import { TranspilerError } from "../error";
import { FunctionData } from "../typings/interface";
import { escapeMathResult, escapeResult } from "../util";

export const $sum: FunctionData = {
  name: "$sum",
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
  description: "Returns the sum of the numbers",
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
    let sum = numbers
      .map( ( x ) =>
        x.startsWith( "#FUNCTION_START#" ) || x.startsWith( "__$DISCORD_DATA$__" )
          ? x
          : Number( x ),
      )
      .join( "+" );

    const res = escapeMathResult( escapeResult( sum ) );
    currentScope.rest = currentScope.rest.replace( data.total, res );
    return {
      code: res,
      scope,
    };
  },
};
