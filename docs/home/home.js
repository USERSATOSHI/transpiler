function home ()
{
    window.location.href = "https://aoi.js.org/";
}
function playground ()
{
    window.location.href = "https://usersatoshi.github.io/transpiler/playground.html/";
}
function funcs ()
{
    window.location.href = "../functions/";
}
function typedoc ()
{
    window.location.href = "https://usersatoshi.github.io/transpiler/";
}

function diplay ()
{
    document.getElementById( "logodisplay" ).style.display = "block";

}
function display ()
{
    console.log( "hi" );
    document.getElementById( "logodisplay" ).style.display = "block";

}

function logoclose ()
{
    document.getElementById( "logodisplay" ).style.display = "none";
}

function myFunction ()
{
    var x = document.getElementById( "myTopnav" );
    if ( x.className === "topnav" )
    {
        x.className += " responsive";
    } else
    {
        x.className = "topnav";
    }
}
function copy ()
{
    const text = `
const {
    Transpiler,
} = require( "aoi-transpiler" );

const code = \`
$let[hi;1]
$get[hi]
\`;

const func = Transpiler( code, true, {}, true, ).func;

console.log( func )
`;
    const x = document.getElementById( "copy" );
    console.log({x:x?.textContent})
    if ( x?.textContent === "Copy" )
    {
        navigator.clipboard.writeText( text );
        x.textContent = "Copied!";
        x.className = "copied";
        setTimeout( () =>
        {
            x.textContent = "Copy";
            x.className = "copy";
        }, 2000 );
    }
}
