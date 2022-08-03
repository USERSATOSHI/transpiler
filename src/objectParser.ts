import { parseString } from "./stringparser";
import { parseData } from "./util";

export const ObjectQuoteRegex = /".*?"/g;

export class StringObject
{
    parent: StringObject | undefined;
    children: StringObject[];
    start: "{" | "[";
    end?: "}" | "]";
    keys: string[];
    values: string[];
    name: number;
    constructor ( start: "{" | "[", parent?: StringObject )
    {
        this.parent = parent;
        this.name = Math.random() * 999999;
        this.keys = [];
        this.values = [];
        this.start = start;
        this.end = undefined;
        this.children = [];
    }
    addKey ( text: string )
    {
        this.keys.push( text );
    }
    addValue ( text: string )
    {
        this.values.push( text );
    }
    addEnd ( text: "}" | "]" )
    {
        this.end = text;
    }
    pushChild ( child: StringObject )
    {
        this.children.push( child );
    }
    solve ()
    {
        if ( this.children )
        {
            this.children.forEach( ( x ) =>
            {
                const res = x.solve();
                const index = this.values.indexOf( `#StringObject_${ x.name }#` );
                const keyIndex = this.keys.indexOf( `#StringObject_${ x.name }#` );
                this.keys[ keyIndex ] = res;
                this.values[ index ] = res;
            } );
            const keys = this.keys;
            const values = this.values;
            let i = 0;
            let text = ``;
            if ( this.start === "[" )
            {
                text = values.join( "," );
                return `${ this.start }${ text }${ this.end }`;
            }
            while ( i < keys.length )
            {
                text += `${ keys[ i ] } : ${ values[ i ] },`;
                i++;
            }
            text = text.slice( 0, text.length - 1 );
            return `${ this.start }${ text }${ this.end }`;
        } else
        {
            const keys = this.keys;
            const values = this.values;
            let i = 0;
            let text = ``;
            if ( this.start === "[" )
            {
                text = values.join( "," );
                return `${ this.start }${ text }${ this.end }`;
            }
            while ( i < keys.length )
            {
                text += `${ keys[ i ] } : ${ values[ i ] },`;
                i++;
            }
            text = text.slice( 0, text.length - 1 );
            return `${ this.start }${ text }${ this.end }`;
        }
    }
}

export function getObjectData ( stringObject: string, currentObj: StringObject )
{
    let i = 0,
        text = "";
    while ( i < stringObject.length )
    {
        const char = stringObject[ i ];
        if ( char === "{" || char === "[" )
        {
            const newObj = new StringObject( char, currentObj );
            currentObj.addValue( `#StringObject_${ newObj.name }#` );
            currentObj = newObj;
        } else if ( char === "}" || char === "]" )
        {
            currentObj.addEnd( char );
            if ( text.trim() !== "" )
            {
                let t = parseData( text.trim() );
                if ( typeof t === "string" )
                {
                    if ( t.trim().startsWith( "'" ) || t.trim().startsWith( "\"" ) || t.trim().startsWith( "`" ) )
                    {
                        t = t.trim().slice( 1, t.trim().length - 1 );
                        t = parseString( t );
                    }
                    else if ( t.includes( "#FUNCTION_START#" ) )
                    {
                        if (
                            t
                                .replaceAll( /#FUNCTION_START#(.+?)#FUNCTION_END#/g, "" )
                                .trim() !== ""
                        )
                        {
                            t = parseString( t );
                        }
                    } else
                        t = parseString( t );
                }
                currentObj.addValue( t );
                text = "";
            }
            currentObj.parent?.pushChild( currentObj );
            currentObj = <StringObject> currentObj.parent;
        } else if ( char === ":" )
        {
            currentObj.addKey( text.trim() );
            text = "";
        } else if ( char === "," )
        {
            if ( currentObj.start === "[" )
            {
                let t = parseData( text.trim() );
                if ( typeof t === "string" )
                {
                    if ( t.trim().startsWith( "'" ) || t.trim().startsWith( "\"" ) || t.trim().startsWith( "`" ) )
                    {
                        t = t.trim().slice( 1, t.trim().length - 1 );
                        t = parseString( t );
                    }
                    else if ( t.includes( "#FUNCTION_START#" ) )
                    {
                        if (
                            t
                                .replaceAll( /#FUNCTION_START#(.+?)#FUNCTION_END#/g, "" )
                                .trim() !== ""
                        )
                        {
                            t = parseString( t );
                        }
                    } else
                        t = parseString( t );
                }
                currentObj.addValue( t );
            } else
            {
                let t = parseData( text.trim() );
                if ( typeof t === "string" )
                {
                    if ( t.trim().startsWith( "'" ) || t.trim().startsWith( "\"" ) || t.trim().startsWith( "`" ) )
                    {
                        t = t.trim().slice( 1, t.trim().length - 1 );
                        t = parseString( t );
                    }
                    else if ( t.includes( "#FUNCTION_START#" ) )
                    {
                        if (
                            t
                                .replaceAll( /#FUNCTION_START#(.+?)#FUNCTION_END#/g, "" )
                                .trim() !== ""
                        )
                        {
                            t = parseString( t );
                        }
                    } else
                        t = parseString( t );
                }
                currentObj.addValue( t );
            }
            text = "";
        } else
        {
            text += char;
        }
        i++;
    }
    if ( text.trim() !== "" )
    {
        let t = parseData( text.trim() );
        if ( typeof t === "string" )
        {
            if ( t.trim().startsWith( "'" ) || t.trim().startsWith( "\"" ) || t.trim().startsWith( "`" ) )
            {
                t = t.trim().slice( 1, t.trim().length - 1 );
                t = parseString( t );
            }
            else if ( t.includes( "#FUNCTION_START#" ) )
            {
                if (
                    t
                        .replaceAll( /#FUNCTION_START#(.+?)#FUNCTION_END#/g, "" )
                        .trim() !== ""
                )
                {
                    t = parseString( t );
                }
            } else
                t = parseString( t );
        }
        currentObj.addValue( t );
    }
    return currentObj;
}

export function parseStringObject (
    stringObject: string,
    currentObj: StringObject,
)
{
    const quotes = stringObject.match( ObjectQuoteRegex );
    if ( quotes )
    {
        quotes.forEach( ( x ) =>
        {
            const newx = x
                .replaceAll( ":", "#OBJECT_SEPARATER#" )
                .replaceAll( "{", "#OBJECT_STARTER#" )
                .replaceAll( "}", "#OBJECT_ENDER#" )
                .replaceAll( "[", "#ARRAY_STARTER#" )
                .replaceAll( "]", "#ARRAY_ENDER#" )
                .replaceAll( ",", "#ARRAY_SEPARATOR#" );
            stringObject = stringObject.replace( x, newx );
        } );
    }
    return getObjectData(
        stringObject.slice( 1, stringObject.length - 1 ),
        currentObj,
    );
}
