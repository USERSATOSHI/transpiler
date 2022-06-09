"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docGen = void 0;
const functions_1 = require("../functions");
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const showdown_1 = require("showdown");
const convert = new showdown_1.Converter();
convert.setFlavor("github");
convert.setOption("tables", true);
const sortedFuncs = Object.keys(functions_1.datas).sort();
async function docGen() {
    (0, fs_1.mkdirSync)("./docs/functions", { recursive: true });
    const functionmd = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width" /><title>Transpiler Functions</title></head><body>
<style>
td,tr {
    padding: 10px;
}
h1 {
    text-align: center;
    word-wrap: break-word;
}
::-webkit-scrollbar {
  width: 10px;
}
* {
    font-family: Cascadia Code;
}
/* Track */
::-webkit-scrollbar-track {
  background: black;
    transition: 0.5s;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: white;
  transition: 0.5s;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: black;
}
::-webkit-scrollbar-track:hover {
  background: white;
}
html {
    background-color: black;
    overflow-x: hidden;
}
body {
    font-family: 'Lato', sans-serif;
    color:white;
    background-color: black;
}
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 1s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  word-break: break-word;
  color: white;
  display: block;
  border: 1px solid white;
  outline: -1px solid white;
  transition: 0.3s ease;
  box-sizing: border-box;
}

/* When you mouse over the navigation links, change their color */
a:hover {
  background-color: white;
      transform: scale(1.1) translateX(5px);
  color: #111;
  outline-color: black;
    border: 1px solid black;
  outline-offset: 4px;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left 1s;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1 {
  text-align: center;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}

}
@media only screen and (max-width: 600px) {
  body {
    margin: 0;
    font-size: 25px;
  }
  * {
    font-size: 25px;
  }
    td,tr {
    font-size: 20px;
  }
  h1 {
    font-size: 30px
  }
}

.navbar {
    width: 100%;
    height: 60px;
    font-size: 30px;
    padding: 10px;
    margin-left: 20px;
    overflow-x:hidden;
    display: flex;
    justify-content: space-between;
}
.sidebarbutton {
    transition: 0.5s;
        cursor: pointer;
        width: 30px;
        float:left;
}
.sidebarbutton:hover {
    background-color: white;
    color: black;
    transform: scale(1.1) translateX(5px);

}
.buttons {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: safe;
    float:right;
}
.home {
    background-color: transparent;
    color: white;
    border-radius: 5px;
    border: none;
    font-size: 30px;
    transition: 0.5s;
    cursor: pointer;
}
.home:hover {
    background-color: white;
    color: black;
    transform: scale(1.1) translateX(5px);
}
</style>
<div class = "navbar" >
<div class = "buttons">
<button class = "home" onclick = "home()">Home</button>
<button class = "home" onclick = "playground()">Playground</button>
<button class = "home" onclick = "typedoc()">Typedoc</button>
</div>
</div>
<div markdown ="1" class="main" id = "main">
  <h1>Functions</h1>
  
  ${sortedFuncs
        .map((func) => {
        return `<a href="./${func}.html">${func}</a>`;
    })
        .join("\n")}
  </div>
<script>
function typedoc() { 
  window.location.href = 'https://usersatoshi.github.io/transpiler/'
}
function home() { 
  window.location.href = 'https://usersatoshi.github.io/transpiler/home'
}
function playground() {
  window.location.href = 'https://usersatoshi.github.io/transpiler/playground'
}
function openNav() {
  document.getElementById("mySidenav").style.width = "30%";
  document.getElementById("main").style.marginLeft = "30%";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "black";
}
</script>

</body>
</html>`;
    await (0, promises_1.writeFile)("./docs/functions/index.html", convert.makeHtml(functionmd));
    for (const func of Object.values(functions_1.datas)) {
        const format = `
<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width" /></head><body>
<style>
td,tr {
    padding: 10px;
}
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: black;
    transition: 0.5s;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: white;
  transition: 0.5s;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: black;
}
::-webkit-scrollbar-track:hover {
  background: white;
}
html {
    background-color: black;
    overflow-x: hidden;
}
body {
    font-family: 'Lato', sans-serif;
    color:white;
    background-color: black;
}
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 1s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  word-break: break-word;
  color: white;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  background-color: white;
      transform: scale(1.1) translateX(5px);
  color: #111;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left 1s;
  padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}

}
@media only screen and (max-width: 600px) {
  
  body {
    font-size: 25px;
  }
    td,tr {
    font-size: 20px;
  }
  * {
    font-size: 18px;
  }
  h1 {
    font-size: 30px
  }
}

.navbar {
    width: 100%;
    height: 60px;
    font-size: 30px;
    padding: 10px;
    margin-left: 20px;
    overflow-x:hidden;
    display: flex;
    justify-content: space-between;
}
.sidebarbutton {
    transition: 0.5s;
        cursor: pointer;
        width: 30px;
        float:left;
}
.sidebarbutton:hover {
    background-color: white;
    color: black;
    transform: scale(1.1) translateX(5px);

}
.buttons {
    width: 100%;
    display: flex;
    justify-content: space-around;
    float:right;
}
.home {
    background-color: transparent;
    color: white;
    border-radius: 5px;
    border: none;
    font-size: 30px;
    transition: 0.5s;
    cursor: pointer;
}
.home:hover {
    background-color: white;
    color: black;
    transform: scale(1.1) translateX(5px);
}
</style>
<div class = "navbar" >
<div class = "sidebarbutton" onclick="openNav()" >&#9776;</div>
<div class = "buttons">
<button class = "home" onclick = "home()">Home</button>
<button class = "home" onclick = "playground()">Playground</button>
<button class = "home" onclick = "typedoc()">Typedoc</button>
</div>
</div>
<div markdown ="1" class="sidenav" id = "mySidenav">
<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
${sortedFuncs.map((x) => `<a href="./${x}.html">${x}</a>`).join("\n")}
</div>
<div markdown ="1" class="main" id = "main">
# ${func.name}
${func.description}

${func.fields.length
            ? `## Parameters
| Name | Type | Required |
| ------ | :------: | -------: |
${func.fields
                .map((x) => {
                return `| ${x.name} | ${x.type.replaceAll("|", " &#124; ")} | ${x.required} |`;
            })
                .join("\n")}
`
            : ""}

## Usage
\`\`\`php
${func.name}${func.fields.length
            ? `[${func.fields
                .map((x) => (x.required ? `${x.name}` : `${x.name}?`))
                .join(";")}]`
            : ""}
\`\`\`
## Returns
${func.returns}
## Default
${func.default
            .map((x, y) => x === "void"
            ? func.fields[y].name + ": required"
            : func.fields[y].name + ": " + x)
            .join("\n")}
</div>
<script>
function typedoc() { 
  window.location.href = 'https://usersatoshi.github.io/transpiler/'
}
function home() { 
  window.location.href = '../home'
}
function playground() {
  window.location.href = 'https://usersatoshi.github.io/transpiler/playground.html'
}
function openNav() {
  document.getElementById("mySidenav").style.width = "30%";
  document.getElementById("main").style.marginLeft = "30%";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "black";
}
</script>

</body>
</html>
  `;
        const htmlfile = convert.makeHtml(format);
        await (0, promises_1.writeFile)(`./docs/functions/${func.name}.html`, htmlfile);
    }
}
exports.docGen = docGen;
docGen();
//# sourceMappingURL=functionDoc.js.map