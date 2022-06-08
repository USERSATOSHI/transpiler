import { writeFile } from 'fs/promises';
import { mkdirSync } from 'fs';
const html = `<html class="light">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>User Satoshi</title>
    <link href="playground.css" rel="stylesheet" type="text/css" />
</head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stellar.js/0.6.2/jquery.stellar.min.js"></script>
<link href="https://code.jquery.com/ui/1.8.23/themes/base/jquery-ui.css" rel="stylesheet" type="text/css">
</link>

<body data-stellar-background-ratio="2">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"
        integrity="sha512-c3Nl8+7g4LMSTdrm621y7kf9v3SDPnhxLNhcjFJbKECVnmZHTdo+IRO05sNLTH/D3vA6u1X32ehoLC7WFVdheg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>var exports = {};</script>
    <script src="./playground.js">

    </script>
    <script src="https://code.jquery.com/ui/1.8.23/jquery-ui.js"></script>
    <div class="topnav" id="myTopnav">
        <image
            src="https://cdn.discordapp.com/attachments/734127839544344678/984115861445034034/Untitled32_20220608163112.png"
            class="logo"></image>
        <a href="https://usersatoshi.github.io/transpiler/home">Home</a>
        <a href="https://usersatoshi.github.io/transpiler/playground.html" class="active">PlayGround</a>
        <a href="../functions">Functions</a>
        <a href="https://usersatoshi.github.io/transpiler">Typedoc</a>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
            <i class="fa fa-bars">&backepsilon;</i>
        </a>
    </div>
    <div class="main">
        <div class="header">
            <h1>PlayGround</h1>
        </div>
        <!-- code playground area -->
        <form action="https://transpilerPlaygroundapi.usersatoshi.repl.co/transpile" method="post">
            <div class=textarea>
                <textarea name="code" id="code" rows="5" cols="10">Type your code here</textarea>
                <br>
            <div class=submit>
                <button class="home">Submit</button>
            </div>
        </form>
        <br>
        <br>
        <div class=resarea id=resarea>
            <h2>Result</h2>
            <textarea readonly=true id=resareaText rows="5" cols="50">
            result will be shown here
            </textarea>
        </div>
        <br>
        <br>
    </div>
    <br>
        <footer class="copyright">Created by Ayaka | Made possible by Akarui Development Team</footer>
        
  </body>
</html>`;

const css = `/*importing Cascadia Code Font*/
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
  background-color: black;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 30px;
  float: right;
  text-align: right;
  padding-top: 10px;
  transition: 0.5s;
  cursor: pointer;
    font-family: Cascadia Code;
}
.copy,
.copied {
  float: right;
}
.home:hover {
  background-color: white;
  color: black;
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
  margin-top: 65.5px;
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
  font-family: Cascadia Code;
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
  transform: scale(1.1);
  transition: 500ms;
}

.round:hover {
  transform: scale(1.6);
}

textarea , .textarea ,.resarea {
    border: none;
    background-color: rgba(0, 0, 0, 0.701);
    padding: 10px;
    position: relative;
    font-size: 40px;
    font-family: Cascadia Code;
    color:white;
    width: 100%;
    height: 25%;
    resize: none;
}
`;

const js = `function myFunction ()
{
    var x = document.getElementById( "myTopnav" );
    if ( x.className === "topnav" )
    {
        x.className += " responsive";
    } else
    {
        x.className = "topnav";
    }
}`;

export async function homeGen() {
  mkdirSync("./docs/playground/", { recursive: true });
  await writeFile("./docs/playground/index.html", html);
  await writeFile("./docs/playground/playground.css", css);
  await writeFile("./docs/playground/playground.js", js);
}

homeGen();