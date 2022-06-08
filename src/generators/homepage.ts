import { writeFile } from "fs/promises";
import { mkdirSync } from "fs";
import { readFileSync } from "fs";
const homehtml = `<!DOCTYPE html>
<html class="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>User Satoshi</title>
    <link href="home.css" rel="stylesheet" type="text/css" />
  </head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/stellar.js/0.6.2/jquery.stellar.min.js"></script>
  <body data-stellar-background-ratio="2">
    <div class="topnav" id="myTopnav">
      <image src="https://cdn.discordapp.com/attachments/734127839544344678/984115861445034034/Untitled32_20220608163112.png" class="logo"></image>
      <a href="https://usersatoshi.github.io/transpiler/home" class="active">Home</a>
      <a href="https://usersatoshi.github.io/transpiler/playground"
        >PlayGround</a
      >
      <a href="../functions">Functions</a>
      <a href="https://usersatoshi.github.io/transpiler">Typedoc</a>
      <a href="javascript:void(0);" class="icon" onclick="myFunction()">
        <i class="fa fa-bars">&backepsilon;</i>
      </a>
    </div>

    <div class="main">
      <div class="header">
        <h1>Aoi-Transpiler</h1>
      </div>
      <div class="intro">
A Transpiler that converts aoi.js code to javascript.
      </div>
      <br />
      <br />
      <div class="example">
        <h2>Example</h2>
        <div class="codeblock" id="setupcode">
          <button class="copy" id="copy" onclick="copy()">Copy</button>
          <br />
          &nbsp;&nbspconst { <br /><i class="function">&nbsp;&nbsp;Transpiler</i><br />
          &nbsp;&nbsp} = <i class="function">require</i>(<i class="string"
            >&nbsp;'aoi-transpiler'&nbsp;</i
          >);<br /><br />
          &nbsp;&nbspconst <i class="variable">code</i> =
          <i class="string">\`<br />&nbsp;&nbsp$let[hi;1]<br />&nbsp;&nbsp$get[hi]<br />&nbsp;&nbsp\`</i
          >;<br /><br />
          &nbsp;&nbspconst <i class="variable">func</i> =
          <i class="function">Transpiler</i>(&nbsp;<i class="variable">code</i
          >,&nbsp;<i class="boolean">true</i>,&nbsp;<i class="property">{}</i
          >,&nbsp;<i class="boolean">true</i>,&nbsp;).<i class="property"
            >func</i
          >;<br /><br />
          &nbsp;&nbsp<i class="global">console</i>.<i class="function">log</i>(&nbsp;<i
            class="variable"
            >func</i
          >&nbsp;);<br />
          <br />
        </div>
        <br />
        <br />
      </div>
      <br />
      <br />
      <div class = mainlinks>
      <div class="links">
        <a href="https://github.com/usersatoshi/transpiler"
          ><img
            class="round"
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        /></a>
      </div>&nbsp;&nbsp;&nbsp;&nbsp;
      <div class = links>
        <a href="https://aoi.js.org/invite"
          ><img
            class="round"
            src="https://cdn.discordapp.com/attachments/734127839544344678/984112343954903141/ezgif.com-gif-maker_11.png"
        /></a>
      </div>
      </div>
      <br />
      <br />
    </div>
    <br />
    <br />
    <footer class="copyright">Created by Ayaka | Made possible by Akarui Development Team</footer>
    <script src="home.js"></script>
  </body>
</html>
`;
const homecss = `/*importing Cascadia Code Font*/
@import url("https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/cascadia-code.min.css");
::-webkit-scrollbar {
  width: 10px;
}
* {
    font-family: Cascadia Code;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: rgb(0, 0, 0);
}
::-webkit-scrollbar-track-piece {
  background: #ffffff;
}
html {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
  background-color: black;
}
body {
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-image: url("https://cdn.discordapp.com/attachments/734127839544344678/984115861445034034/Untitled32_20220608163112.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center !important;
}
.topnav {
  overflow: hidden;
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.733);
}

.topnav a {
  float: right;
  display: block;
  color: #ffffff;
  text-align: center;
  padding: 14.6px 16px;
  text-decoration: none;
  font-size: 30px;
  transition: 500ms ease;
}

.topnav a:hover {
  background-color: rgb(255, 255, 255);
  color: black;
}

.topnav a.active {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}

.topnav .icon {
  display: none;
}
.home,
.copy,
.copied {
  background-color: transparent;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 30px;
  text-align: center;
  padding-top: 10px;
  transition: 0.5s;
  cursor: pointer;
}
.copy,
.copied {
  float: right;
}
.home:hover {
  background-color: white;
  font-family: Cascadia Code;
  color: black;
  transform: scale(1.1) translateX(5px);
}
.copy:hover {
  background-color: white;
  color: black;
  transform: scale(1.1) translateX(-5px);
}
.logo {
  transition: 500ms;
  height: 8vh;
  width: auto;

  float: left;
}
.logo:hover {
  transform: scale(1.6);
}

.main {
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  align-items: center;
  background-color: transparent;
}

.header {
    margin-top:65.5px;
  background-color: rgba(0, 0, 0, 0.733);
  color: white;
  font-size: 30px;
  width: 100%;
  text-align: center;
}

h1 {
  color: white;
}

body::backdrop {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  background-color: rgba(0, 0, 0, 0.559);
}

.intro,
.example {
  color: white;
  background-color: rgba(36, 36, 36, 0.694);
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 2vw;
  padding-right: 2vw;
  width: 100%;
    text-align: center;
  font-size: 50px;
  box-shadow: 10px 10px 10px rgb(0, 0, 0);
}
.example {
  width: 100%;
  text-align: center;
}
.codeblock {
  background-color: rgb(0, 0, 0);
  text-align: left;
  font-family: Cascadia Code;
  font-size: 30px;
  word-wrap: break-word;
}
.copyright {
  color: white;
  margin-top: auto;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  font-weight: 900;
  text-align: center;
  text-emphasis: bold;
  background-color: rgb(56, 55, 55);
  font-size: 20px;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 2vw;
  padding-right: 2vw;
  box-shadow: 10px 10px 10px rgb(0, 0, 0);
}

@media screen and (max-width: 710px) {
  .topnav a:not(:first-child) {
    display: none;
  }
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 710px) {
  .intro,
  .codeblock {
    font-size: 20px;
  }
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive .icon {
    position: absolute;
    color: white;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}

.function {
  color: rgb(130, 177, 238);
}
.variable {
  color: rgb(0, 130, 244);
}
.string {
  color: rgb(255, 255, 0);
}
.global {
  color: rgb(255, 0, 0);
}
.property {
  color: aqua;
}

.boolean {
  color: rgb(162, 0, 255);
}
.mainlinks {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.links {
  flex: 1;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
}

.round {
  width: 50px;
  height: 50px;
  transform: scale(1.2);
  transition: 500ms;
}

.round:hover {
  transform: scale(1.6);
}
`;

const homejs = `function home ()
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
    const text = \`
const {
    Transpiler,
} = require( "aoi-transpiler" );

const code = \\\`
$let[hi;1]
$get[hi]
\\\`;

const func = Transpiler( code, true, {}, true, ).func;

console.log( func )
\`;
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
`;
export async function homeGen() {
  mkdirSync("./docs/home/", { recursive: true });
  await writeFile("./docs/home/index.html", homehtml);
  await writeFile("./docs/home/home.css", homecss);
  await writeFile("./docs/home/home.js", homejs);
}

homeGen();
