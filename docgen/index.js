const fs = require('fs');
const { inspect } = require('util')
const { datas } = require('aoi-transpiler');
const functionlistarray = []
const functionlistharray = []
const sortedKeys = Object.keys(datas).sort();
for(const data of sortedKeys) {
    functionlistarray.push(`
    <a href="./funcs/${datas[data].name}.html" class="functions">
                    <div class= 'functionName'>${datas[data].name}</div>
                    <div id="${datas[data].name}" class = 'functionDesc'>${datas[data].description}</div>
                </a>
`);
functionlistharray.push(`<a href="${datas[data].name}.html">${datas[data].name}</a>`)
}

fs.writeFileSync(
  "./docs/functions/index.html",
  `<!DOCTYPE html>
<html class="light">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0 max-scale=1.0">
    <meta name="title" content="Functions">
    <meta name="description" content="Function information">
    <meta name="thumbnail"
        content="https://cdn.discordapp.com/attachments/734127839544344678/984115861445034034/Untitled32_20220608163112.png">
    <meta name="image" content="">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    <!-- jsquery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <!-- particle.js -->
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@1.9.2/dist/tsparticles.min.js"
        integrity="sha256-5kED68Spy7K2CEbfu4CjV92DmZR5ZQFUoIR5qmPzZWg=" crossorigin="anonymous"></script>
    <!-- stellar.js -->
    <script src="../jquery.stellar.min.js"></script>
    <!-- fontawesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />

    <link id="loader-css" rel="stylesheet" href="../loader.css" />
    <link id="html-css" rel="stylesheet" href="./light.css" />
</head>

<body>
    <script src="./index.js"></script>
    <script id=loader src="./loader.js"></script>
    <div id="particleloader2"></div>
    <div class="loadingscreenbox">
        <image src="https://cdn.discordapp.com/attachments/734127839544344678/986390479807606814/unknown.png"
            class="bg">
        </image>
        <image src="https://cdn.discordapp.com/attachments/734127839544344678/986364350778466324/unknown.png"
            class="text"></image>
    </div>
    <div class="body">
        <div class="sidebar">
            <div class="closebtn" style="--i: 7" onclick="closesidebar()">
                Close
            </div>
        <a href="https://aoi.js.org" style="--i: 6">Aoi.js</a>
        <a href="https://github.com/usersatoshi/transpiler" style="--i: 5"
          >Github</a
        >
        <a href="../typedoc/" style="--i: 4">TypeDoc</a>
        <a href="../" style="--i: 3">Home</a>
        <a href="https://transpilerplaygroundapi.usersatoshi.repl.co" style="--i: 2">Playground</a>
        </div>
        <div class="settingbar">
            <div class="closebtn" style="--i: 7" onclick="closesettingbar()">
                <i class="material-icons">close</i>
            </div>
            <div class="3d-animations" style="--top: 70px">
                <i class="material-icons">animation</i><i>Enable 3d Animation</i><label class="switch">
                    <input type="checkbox" checked id="3dmode" onclick="dmode()" />
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="website-mode" style="--top: 170px">
                <i class="material-icons">filter_vintage</i>
                <i class="text">Enable special mode</i><label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="displaybox">
            <div class="navbar">
                <div class="sidebaricon" onclick="sidebaricon()">
                    <image
                        src="https://cdn.discordapp.com/attachments/734127839544344678/986390479807606814/unknown.png">
                    </image>
                </div>
                <div class="navbarbtns">
                <input type="text" id="search" placeholder="Search" oninput="search()"></input>
                </div>
                        <div class="settings">
          <div class="mode">
            <div class="modebtn" id="modeb" onclick="mode(this)">
              <i id="modebtext" class="material-icons">light_mode</i>
            </div>
          </div>
          <div class="sets">
            <div class="setbtn" id="setb" onclick="sets(this)">
              <i id="setbtext" class="material-icons">settings</i>
            </div>
          </div>
        </div>
            </div>
            <div id="functions" class="container">
                ${functionlistarray.join("\n")}
            </div>
        </div>
</body>

</html>`,
);

fs.writeFileSync(
  "./docs/functions/index.js",
  `const keys = ${inspect(sortedKeys, { depth: null })}
const datas = ${JSON.stringify(datas)}

function getcurrentmode() {
  const dmode = localStorage.getItem("3dmode");
  return dmode ?? "true";
}

function getcurrenttheme() {
  const dtheme = localStorage.getItem("currentthememode");
  return dtheme ?? "light";
}

function setcurrenttheme(theme) {
  localStorage.setItem("currentthememode", theme);
}

function setcurrentmode(mode) {
  localStorage.setItem("3dmode", mode);
}

$(document).ready(async function () {
  $(".functionDesc").hide();
  var orginal_width = window.screen.width;
  $(".body").css("display", "none");
  $(".background").css("display", "none");
  if (getcurrenttheme() === "light") {
    document.getElementById("html-css").href = "./light.css";
    $("#modebtext").text("light_mode");
  } else {
    document.getElementById("html-css").href = "./dark.css";
    $("#modebtext").text("dark_mode");
  }
  setTimeout(() => {
    $(".background3").attr("id", "particlebg");
    $(".loadingscreenbox").remove();
    $("#particleloader2").remove();
    $("#loader").remove();
    $("#loader-css").remove();
    $(".body").css("display", "");
    $(".background").css("display", "");
    tsParticles.load("particlebg", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#00bcd4", "#1977d4", "#008564", "#d41800", "#8e467f"],
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#b6b2b2",
          },
        },
        opacity: {
          value: 0.5211089197812949,
          random: false,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 8.017060304327615,
          random: true,
          anim: {
            enable: true,
            speed: 12.181158184520175,
            size_min: 0.1,
            sync: true,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#c8c8c8",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "bounce",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
    if (getcurrentmode() === "true") {
      $("#3dmode").prop("checked", true);
    } else {
      $("#3dmode").prop("checked", false);
      $(".sidebar").css("display", "none");
      $(".no-3d-sidebar").css("display", "none");
      $(".no-3d-sidebar").css("transition", "0");
      $(".settingbar").css("transform", "rotateY(0) skewY(-0deg)");
      const t = setTimeout(() => {
        $(".sidebar").addClass("no-3d-sidebar");
        $(".sidebar .closebtn").text("X");
        $(".sidebar").removeClass("sidebar");
        $(".no-3d-sidebar").css("display", "");
        $(".no-3d-sidebar").css("transition", "");
        $(".sidebar").css("display", "");
        $(".settingbar").addClass("no-3d-settingbar");
        $(".settingbar").removeClass("settingbar");
        clearTimeout(t);
      }, 500);
    }
    if (window.screen.width < 720) {
      $(".sidebar").css("display", "none");
      $(".sidebar").addClass("no-3d-sidebar");
      $(".sidebar .closebtn").text("X");
      $("#setbtext").text("expand_more");
      $(".sidebar").removeClass("sidebar");
      setTimeout(() => {
        $(".no-3d-sidebar").css("display", "");
      }, 1000);
    }
    console.log({ width: window.screen.width, height: window.screen.height });
  }, 2000);
});

function sidebaricon() {
  console.log("hi");
  if (getcurrentmode() === "true" && window.screen.width > 720) {
    if ($(".sidebar").css("display") !== "flex") {
      $(".sidebar").css("display", "");
      $(".sidebar").css("grid-template-columns", "");
      $(".sidebar").css("grid-template-rows", "");
      $(".sidebar").css("gap", "");
      $(".sidebar").css("height", "");
      $(".sidebar").css("margin-bottom", "");
      $(".sidebar a").css("width", "");
    }
    $("html").css("overflow-x", "hidden");
    window.scrollTo(0, 0);
    $(".body").css("--body-pseudo-display", "block");
    $(".sidebar").css("--sidebar-display", "flex");
    $(".body").css(
      "transform",
      "skewY(45deg) rotateY(120deg) translateX(50vw) translateY(50vh)",
    );
    // $("body").css("overflow", "hidden");
    $(".displaybox").css("height", "50%");
  } else {
    $(".no-3d-sidebar").css("width", $(window).height() > 600 ? "50%" : "100%");
    if ($(window).height() < 600) {
      $(".no-3d-sidebar").css("display", "grid");
      $(".no-3d-sidebar").css("grid-template-columns", "1fr 1fr");
      $(".no-3d-sidebar").css("grid-template-rows", "1fr 1fr");
      $(".no-3d-sidebar").css("gap", "2px 2px");
      $(".no-3d-sidebar").css("height", "50%");
      $(".no-3d-sidebar").css("margin-bottom", "60px");
      $(".no-3d-sidebar a").css("width", "50%");
    } else {
      $(".no-3d-sidebar").css("display", "");
      $(".no-3d-sidebar").css("grid-template-columns", "");
      $(".no-3d-sidebar").css("grid-template-rows", "");
      $(".no-3d-sidebar").css("gap", "");
      $(".no-3d-sidebar").css("height", "");
      $(".no-3d-sidebar").css("margin-bottom", "");
      $(".no-3d-sidebar a").css("width", "");
    }
    $(".body").css("background-color", "black");
    $(".background").css("transition", "0.5s");
    $(".background").css("opacity", "0.2");
    $(".container").css("opacity", "0.2");
    $(".displaybox").css("background-color", "rgba(0,0,0,0.5");
  }
  return false;
}

function closesidebar() {
  if (getcurrentmode() === "true" && window.screen.width > 720) {
    $(".body").css("--body-pseudo-display", "none");
    $(".sidebar").css("--sidebar-display", "none");
    $(".body").css("transform", "scale(1)");
    $(".body").css("transform", "");
    $("body").css("overflow", "");
    $(".displaybox").css("height", "100%");
    const to = window.location.href.split("#")[1];
    $("body").scrollTop("#" + to, { duration: 1000 });
    $("html").css("overflow-x", "");
  } else {
    $(".no-3d-sidebar").css("width", "");
    $(".displaybox").css("background-color", "");
    $(".background").css("transition", "");
    $(".body").css("background-color", "");
    $(".container").css("opacity", "");
    $(".background").css("opacity", "");
  }
}

$("#modeb").hover(
  function () {
    // over
    $(".mode .material-icons").addClass("material-symbols-outlined");
    $(".mode .material-icons").removeClass("material-icons");
  },
  function () {
    // out
    $(".mode .material-symbols-outlined").addClass("material-icons");
    $(".mode .material-symbols-outlined").removeClass(
      "material-symbols-outlined",
    );
  },
);

$("#setb").hover(
  function () {
    // over
    $(".sets .material-icons").addClass("material-symbols-outlined");
    $(".sets .material-icons").removeClass("material-icons");
  },
  function () {
    // out
    $(".sets .material-symbols-outlined").addClass("material-icons");
    $(".sets .material-symbols-outlined").removeClass(
      "material-symbols-outlined",
    );
  },
);

function mode() {
  if (getcurrenttheme() === "light") {
    setcurrenttheme("dark");
    document.getElementById("html-css").href = "./dark.css";
    $("#modebtext").text("dark_mode");
  } else {
    setcurrenttheme("light");
    document.getElementById("html-css").href = "./light.css";
    $("#modebtext").text("light_mode");
  }
}

function sets() {
  console.log("hi");
  console.log({
    a: $("#setbtext").text(),
    b: document.querySelector(".setbtn .material-icons"),
  });
  if (window.screen.width < 720) {
    if ($("#setbtext").text() === "expand_more") {
      $(".navbardatas").css("display", "flex");
      $(".navbardatas .navbarbtns").css("display", "none");
      setTimeout(() => {
        $(".navbardatas .navbarbtns").css("display", "");
        $(".navbardatas").css("width", "50%");
        $("#setbtext").text("expand_less");
      }, 200);
    } else {
      setTimeout(() => {
        $(".navbardatas").css("display", "");
      }, 200);
      $(".navbardatas").css("width", "");
      $("#setbtext").text("expand_more");
    }
  } else if (getcurrentmode() === "true") {
    $(".settingbar").css("--settingbar-display", "flex");
    $(".body").css("transform-origin", "left");
    $(".body").css("transform", "rotateY(-45deg) translateX(-50vw)");
    $(".settingbar").css("transform", "rotateY(0) skewY(-1deg)");
    window.scrollTo(0, 0);
    $("body").css("overflow", "hidden");
    $(".displaybox").css("height", "50%");
  } else {
    $(".no-3d-settingbar").css("--settingbar-display", "flex");
    $(".body").css("transform-origin", "left");
    $(".body").css("transform", "translateX(-50vw)");
    window.scrollTo(0, 0);
    $("body").css("overflow", "hidden");
    $(".displaybox").css("height", "50%");
  }
  return false;
}

function closesettingbar() {
  if (getcurrentmode() === "true") {
    $(".settingbar").css("--settingbar-display", "none");
    $(".body").css("transform-origin", "");
    $(".body").css("transform", "");
    $(".settingbar").css("transform", "rotateY(90deg)");
    $("body").css("overflow", "");
    $(".displaybox").css("height", "");
  } else {
    $(".no-3d-settingbar").css("--settingbar-display", "none");
    $(".body").css("transform-origin", "");
    $(".body").css("transform", "");
    $("body").css("overflow", "");
    $(".displaybox").css("height", "");
  }
}
function dmode() {
  if ($("#3dmode").is(":checked")) {
    setcurrentmode("true");
    $(".no-3d-sidebar").addClass("sidebar");
    $(".no-3d-sidebar .closebtn").text("Close");
    $(".no-3d-sidebar").removeClass("no-3d-sidebar");
    $(".no-3d-settingbar").addClass("settingbar");
    $(".no-3d-settingbar").removeClass("no-3d-settingbar");
    $(".settingbar").css("--settingbar-display", "flex");
    $(".body").css("transform-origin", "left");
    $(".body").css("transform", "rotateY(-45deg) translateX(-50vw)");
    $(".settingbar").css("transform", "rotateY(0) skewY(-1deg)");
    window.scrollTo(0, 0);
    $("body").css("overflow", "hidden");
    $(".displaybox").css("height", "50%");
  } else {
    setcurrentmode("false");
    $(".sidebar").addClass("no-3d-sidebar");
    $(".sidebar .closebtn").text("X");
    $(".sidebar").removeClass("sidebar");
    $(".settingbar").addClass("no-3d-settingbar");
    $(".settingbar").css("transform", "rotateY(0) skewY(-0deg)");
    $(".settingbar").removeClass("settingbar");
    $(".no-3d-settingbar").css("--settingbar-display", "flex");
    $(".body").css("transform-origin", "left");
    $(".body").css("transform", "translateX(-50vw)");
    window.scrollTo(0, 0);
    $("body").css("overflow", "hidden");
    $(".displaybox").css("height", "50%");
  }
}
function search(input) {
      let value = document.getElementById("search").value;
      if(value === "$") return;
    value = value.replace("$", "");
      const startsWith = keys.filter((x) =>
        x.toLowerCase().startsWith(value.toLowerCase()),
      );
      const includes = keys.filter((x) =>
        x.toLowerCase().includes(value.toLowerCase()),
      );
      const set = Array.from(new Set(startsWith.concat(includes)));
      const results = set.map((x) => {
        return \` <a href="./funcs/\${datas[x].name}.html" class="functions">
                    <div class= 'functionName'>\${datas[x].name}</div>
                    <div id="\${datas[x].name}" style="display:none" class = 'functionDesc'>\${datas[x].description}</div>
                </a>\`;
      });
      $("#functions").empty();
      $("#functions").html(\`
    \${results.join("\\n")}
  \`);
}

$(document).on(
  "mouseenter",
  ".functions",
  function () {
    $(this).find(".functionDesc").show("fast");
  })
  $(document).on("mouseleave", ".functions", function () {
    $(this).find(".functionDesc").hide("fast");
  });
`,
);

for(const key of sortedKeys) {
    fs.writeFileSync(
      `./docs/functions/funcs/${key}.html`,
      `<!DOCTYPE html>
<html class="light">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0 max-scale=1.0">
    <meta name="title" content="${key}">
      <title>@akarui/transpiler: ${key}</title>
    <meta name="description" content="${datas[key].description}">
    <meta name="thumbnail"
        content="https://cdn.discordapp.com/attachments/734127839544344678/984115861445034034/Untitled32_20220608163112.png">
    <meta name="image" content="">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    <!-- jsquery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <!-- particle.js -->
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@1.9.2/dist/tsparticles.min.js"
        integrity="sha256-5kED68Spy7K2CEbfu4CjV92DmZR5ZQFUoIR5qmPzZWg=" crossorigin="anonymous"></script>
    <!-- stellar.js -->
    <script src="../jquery.stellar.min.js"></script>
    <!-- fontawesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />

    <link id="loader-css" rel="stylesheet" href="../../loader.css" />
    <link id="html-css" rel="stylesheet" href="./lightFunction.css" />
</head>

<body>
    <script src="./indexFunction.js"></script>
    <script id=loader src="./loaderFunction.js"></script>
    <div id="particleloader3"></div>
    <div class="loadingscreenbox">
        <image src="https://cdn.discordapp.com/attachments/734127839544344678/986390479807606814/unknown.png"
            class="bg">
        </image>
        <image src="https://cdn.discordapp.com/attachments/734127839544344678/986364350778466324/unknown.png"
            class="text"></image>
    </div>
    <div class="body">
        <div class="sidebar">
            <div class="closebtn" style="--i: 7" onclick="closesidebar()">
                Close
            </div>
        <a href="https://aoi.js.org" style="--i: 6">Aoi.js</a>
        <a href="https://github.com/usersatoshi/transpiler" style="--i: 5"
          >Github</a
        >
        <a href="../typedoc/" style="--i: 4">TypeDoc</a>
        <a href="../" style="--i: 3">Home</a>
        <a href="https://transpilerplaygroundapi.usersatoshi.repl.co" style="--i: 2">Playground</a>
        </div>
        <div class="settingbar">
            <div class="closebtn" style="--i: 7" onclick="closesettingbar()">
                <i class="material-icons">close</i>
            </div>
            <div class="3d-animations" style="--top: 70px">
                <i class="material-icons">animation</i><i>Enable 3d Animation</i><label class="switch">
                    <input type="checkbox" checked id="3dmode" onclick="dmode()" />
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="website-mode" style="--top: 170px">
                <i class="material-icons">filter_vintage</i>
                <i class="text">Enable special mode</i><label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="displaybox">
            <div class="navbar">
                <div class="sidebaricon" onclick="sidebaricon()">
                    <image
                        src="https://cdn.discordapp.com/attachments/734127839544344678/986390479807606814/unknown.png">
                    </image>
                </div>
                <div class="navbarbtns">

                    <div class="link">
                        <div class="forwarda"></div>
                        <a href="#top">Top</a>
                        <div class="backwarda"></div>
                    </div>
                    <div class="link">
                        <div class="forwarda"></div>
                        <a href="#description">Desc</a>
                        <div class="backwarda"></div>
                    </div>
                    <div class="link">
                        <div class="forwarda"></div>
                        <a href="#usage">Usage</a>
                        <div class="backwarda"></div>
                    </div>
                    <div class="link">
                        <div class="forwarda"></div>
                        <a href="#params">Params</a>
                        <div class="backwarda"></div>
                    </div>
                    <div class="link">
                        <div class="forwarda"></div>
                        <a href="#returns">Returns</a>
                        <div class="backwarda"></div>
                    </div>
                    <div class="link">
                        <div class="forwarda"></div>
                        <a href="#default">Default</a>
                        <div class="backwarda"></div>
                    </div>
                </div>
                <div class="settings">
                    <div class="mode">
                        <div class="modebtn" id="modeb" onclick="mode(this)">
                            <i id="modebtext" class="material-icons">light_mode</i>
                        </div>
                    </div>
                    <div class="sets">
                        <div class="setbtn" id="setb" onclick="sets(this)">
                            <i id="setbtext" class="material-icons">settings</i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sidenav">
                <div class=sideinside>
                    <input type="text" id="search" placeholder="Search" oninput="search()"></input>
                    <br>
                    <br>
                    <br>
                    <div id=functions>
                        ${functionlistharray.join("\n")}
                    </div>
                </div>
                <div class="sideslide" onclick="opensidenav()">></div>
            </div>
            <div class="container" id="top">
                <h1 class="heading">${key}</h1>

                <h2 class="heading" id="description">Description</h2>
                <pre>${datas[key].description}</pre>

                <h2 class="heading" id="usage">Usage</h2>
                <pre>${
                  datas[key].fields.length > 0
                    ? `${datas[key].name}[${datas[key].fields
                        .map((x) => (x.required ? x.name : `${x.name}?`))
                        .join(";")}]`
                    : key
                }</pre>

                <h2 class="heading" id="params">Parameters</h2>
                <pre>${
                  datas[key].fields.length > 0
                    ? datas[key].fields
                        .map(
                          (x) =>
                            (!x.required ? "?" : "") +
                            `${x.name} ( ${x.type} ) `,
                        )
                        .join("\n")
                    : "no parameters available"
                }</pre>

                <h2 class="heading" id="return">Returns</h2>
                <pre>${datas[key].returns}</pre>

                <h2 class="heading" id="default">Default Value</h2>
                <pre>${
                  datas[key].default.length > 0
                    ? datas[key].default
                        .map((x, y) => {
                          const field = datas[key].fields[y].name;
                          return `${field} = ${x === "void" ? "required" : x}`;
                        })
                        .join("\n")
                    : "no default datas"
                }</pre>
            </div>
        </div>
</body>

</html>`,
    );
}

fs.writeFileSync("./docs/functions/funcs/indexFunction.js", `
const keys = ${inspect(sortedKeys, { depth: null })}
const datas = ${JSON.stringify(datas)}

function getcurrentmode() {
  const dmode = localStorage.getItem("3dmode");
  return dmode ?? "true";
}

function getcurrenttheme() {
  const dtheme = localStorage.getItem("currentthememode");
  return dtheme ?? "light";
}

function setcurrenttheme(theme) {
  localStorage.setItem("currentthememode", theme);
}

function setcurrentmode(mode) {
  localStorage.setItem("3dmode", mode);
}

$(document).ready(async function () {
  $(".functions").hover(
    function () {
      $(this).find(".functionDesc").show("fast");
    },
    function () {
      $(this).find(".functionDesc").hide("fast");
    },
  );
  $(".functionDesc").hide();
  var orginal_width = window.screen.width;
  $(".body").css("display", "none");
  $(".background").css("display", "none");
  if (getcurrenttheme() === "light") {
    document.getElementById("html-css").href = "./lightFunction.css";
    $("#modebtext").text("light_mode");
  } else {
    document.getElementById("html-css").href = "./darkFunction.css";
    $("#modebtext").text("dark_mode");
  }
  setTimeout(() => {
    $(".background3").attr("id", "particlebg");
    $(".loadingscreenbox").remove();
    $("#particleloader3").remove();
    $("#loader").remove();
    $("#loader-css").remove();
    $(".body").css("display", "");
    $(".background").css("display", "");
    tsParticles.load("particlebg", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#00bcd4", "#1977d4", "#008564", "#d41800", "#8e467f"],
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#b6b2b2",
          },
        },
        opacity: {
          value: 0.5211089197812949,
          random: false,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 8.017060304327615,
          random: true,
          anim: {
            enable: true,
            speed: 12.181158184520175,
            size_min: 0.1,
            sync: true,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#c8c8c8",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "bounce",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
    if (getcurrentmode() === "true") {
      $("#3dmode").prop("checked", true);
    } else {
      $("#3dmode").prop("checked", false);
      $(".sidebar").css("display", "none");
      $(".no-3d-sidebar").css("display", "none");
      $(".no-3d-sidebar").css("transition", "0");
      $(".settingbar").css("transform", "rotateY(0) skewY(-0deg)");
      const t = setTimeout(() => {
        $(".sidebar").addClass("no-3d-sidebar");
        $(".sidebar .closebtn").text("X");
        $(".sidebar").removeClass("sidebar");
        $(".no-3d-sidebar").css("display", "");
        $(".no-3d-sidebar").css("transition", "");
        $(".sidebar").css("display", "");
        $(".settingbar").addClass("no-3d-settingbar");
        $(".settingbar").removeClass("settingbar");
        clearTimeout(t);
      }, 500);
    }

    console.log({ width: window.screen.width, height: window.screen.height });
    if (window.screen.width < 720) {
      $(".sidebar").css("display", "none");
      $(".sidebar").addClass("no-3d-sidebar");
      $(".sidebar .closebtn").text("X");
      $("#setbtext").text("expand_more");
      $(".sidebar").removeClass("sidebar");
      setTimeout(() => {
        $(".no-3d-sidebar").css("display", "");
      }, 1000);
      $(".navbar .navbarbtns").css("display", "none");
      $(".settingbar").addClass("navbardatas");
      $(".settingbar").removeClass("settingbar");
      $(".navbardatas").html(\`<div class="navbarbtns">
                    <div class="link">
                        <div class="forwarda"></div>
                        <a class="active" href="./index.html">Home</a>
                        <div class="backwarda"></div>
                    </div>
                    <div class="link">
                        <div class="forwarda"></div>
                        <a class="active" href="./index.html">Main</a>
                        <div class="backwarda"></div>
                    </div>
                    <div class="link">
                        <div class="forwarda"></div>
                        <a href="./index.html">Desc</a>
                        <div class="backwarda"></div>
                    </div>
                    <div class="link">
                        <div class="forwarda"></div>
                        <a href="#about">Usage</a>
                        <div class="backwarda"></div>
                    </div>
                    <div class="link">
                        <div class="forwarda"></div>
                        <a href="#example">Type</a>
                        <div class="backwarda"></div>
                    </div>
                    <div class="link">
                        <div class="forwarda"></div>
                        <a href="#collaborators">Example</a>
                        <div class="backwarda"></div>
                    </div>
                </div>\`);
    }
  }, 2000);
});

$(window).resize(function () {
  if (original_width < 720 && window.screen.width < 720) {
    $(".sidebar").css("display", "none");
    $(".sidebar").addClass("no-3d-sidebar");
    $(".sidebar .closebtn").text("X");
    $("#setbtext").text("expand_more");
    $(".sidebar").removeClass("sidebar");
    setTimeout(() => {
      $(".no-3d-sidebar").css("display", "");
    }, 1000);
    $(".navbar .navbarbtns").css("display", "none");
    $(".settingbar").addClass("navbardatas");
    $(".settingbar").removeClass("settingbar");
    $(".navbardatas").html(\`<div class="navbarbtns">
          <div class="link">
            <a class="active" href="./index.html">Home</a>
          </div>
          <div class="link">
            <a href="#about">About</a>
          </div>
          <div class="link">
            <a href="#example">Example</a>
          </div>
          <div class="link">
            <a href="#collaborators">Collabs</a>
          </div>
        </div>\`);
  } else if (original_width > 720 && window.screen.width > 720) {
    $(".no-3d-sidebar").addClass("sidebar");
    $(".sidebar .closebtn").text("Close");
    $("#setbtext").text("settings");
    $(".no-3d-sidebar").removeClass("no-3d-sidebar");
    $(".navbar .navbarbtns").css("display", "");
    $(".navbardatas").addClass("settingbar");
    $(".navbardatas").html(\`\`);
    $(".navbardatas").removeClass("navbardatas");
  } else {
    orginal_width = window.screen.width;
  }
});

function sidebaricon() {
  console.log("hi");
  if (getcurrentmode() === "true" && window.screen.width > 720) {
    if ($(".sidebar").css("display") !== "flex") {
      $(".sidebar").css("display", "");
      $(".sidebar").css("grid-template-columns", "");
      $(".sidebar").css("grid-template-rows", "");
      $(".sidebar").css("gap", "");
      $(".sidebar").css("height", "");
      $(".sidebar").css("margin-bottom", "");
      $(".sidebar a").css("width", "");
    }
    $(".body").css("--body-pseudo-display", "block");
    $(".sidebar").css("--sidebar-display", "flex");
    $("html").css("overflow-x", "hidden");
    $(".body").css(
      "transform",
      " skewY(45deg) rotateY(120deg) translateX(50vw) translateY(50vh)",
    );
    // $("body").css("overflow", "hidden");
    // $(".displaybox").css("height", "50%");
    window.scrollTo(0, 0);
  } else {
    $(".no-3d-sidebar").css("width", $(window).height() > 600 ? "50%" : "100%");
    if ($(window).height() < 600) {
      $(".no-3d-sidebar").css("display", "grid");
      $(".no-3d-sidebar").css("grid-template-columns", "1fr 1fr");
      $(".no-3d-sidebar").css("grid-template-rows", "1fr 1fr");
      $(".no-3d-sidebar").css("gap", "2px 2px");
      $(".no-3d-sidebar").css("height", "50%");
      $(".no-3d-sidebar").css("margin-bottom", "60px");
      $(".no-3d-sidebar a").css("width", "50%");
    } else {
      $(".no-3d-sidebar").css("display", "");
      $(".no-3d-sidebar").css("grid-template-columns", "");
      $(".no-3d-sidebar").css("grid-template-rows", "");
      $(".no-3d-sidebar").css("gap", "");
      $(".no-3d-sidebar").css("height", "");
      $(".no-3d-sidebar").css("margin-bottom", "");
      $(".no-3d-sidebar a").css("width", "");
    }
    $(".body").css("background-color", "black");
    $(".background").css("transition", "0.5s");
    $(".background").css("opacity", "0.2");
    $(".container").css("opacity", "0.2");
    $(".displaybox").css("background-color", "rgba(0,0,0,0.5");
  }
  return false;
}

function closesidebar() {
  if (getcurrentmode() === "true" && window.screen.width > 720) {
    $(".body").css("--body-pseudo-display", "none");
    $(".sidebar").css("--sidebar-display", "none");
    $(".body").css("transform", "scale(1)");
    $(".body").css("transform", "");
    $("body").css("overflow", "");
    $(".displaybox").css("height", "100%");
    $("html").css("overflow-x", "");
    const to = window.location.href.split("#")[1];
    $("body").scrollTop("#" + to, { duration: 1000 });
  } else {
    $(".no-3d-sidebar").css("width", "");
    $(".displaybox").css("background-color", "");
    $(".background").css("transition", "");
    $(".body").css("background-color", "");
    $(".container").css("opacity", "");
    $(".background").css("opacity", "");
  }
}

$("#modeb").hover(
  function () {
    // over
    $(".mode .material-icons").addClass("material-symbols-outlined");
    $(".mode .material-icons").removeClass("material-icons");
  },
  function () {
    // out
    $(".mode .material-symbols-outlined").addClass("material-icons");
    $(".mode .material-symbols-outlined").removeClass(
      "material-symbols-outlined",
    );
  },
);

$("#setb").hover(
  function () {
    // over
    $(".sets .material-icons").addClass("material-symbols-outlined");
    $(".sets .material-icons").removeClass("material-icons");
  },
  function () {
    // out
    $(".sets .material-symbols-outlined").addClass("material-icons");
    $(".sets .material-symbols-outlined").removeClass(
      "material-symbols-outlined",
    );
  },
);

function mode() {
  if (getcurrenttheme() === "light") {
    setcurrenttheme("dark");
    document.getElementById("html-css").href = "./darkFunction.css";
    $("#modebtext").text("dark_mode");
  } else {
    setcurrenttheme("light");
    document.getElementById("html-css").href = "./lightFunction.css";
    $("#modebtext").text("light_mode");
  }
}

function sets() {
  console.log("hi");
  console.log({
    a: $("#setbtext").text(),
    b: document.querySelector(".setbtn .material-icons"),
  });
  if (window.screen.width < 720) {
    if ($("#setbtext").text() === "expand_more") {
      $(".navbardatas").css("display", "flex");
      $(".navbardatas .navbarbtns").css("display", "none");
      setTimeout(() => {
        $(".navbardatas .navbarbtns").css("display", "");
        $(".navbardatas").css("width", "50%");
        $("#setbtext").text("expand_less");
      }, 200);
    } else {
      setTimeout(() => {
        $(".navbardatas").css("display", "");
      }, 200);
      $(".navbardatas").css("width", "");
      $("#setbtext").text("expand_more");
    }
  } else if (getcurrentmode() === "true") {
    $(".settingbar").css("--settingbar-display", "flex");
    $(".body").css("transform-origin", "left");
    $(".body").css("transform", "rotateY(-45deg) translateX(-50vw)");
    $(".settingbar").css("transform", "rotateY(0) skewY(-1deg)");
    window.scrollTo(0, 0);
    $("body").css("overflow", "hidden");
    $(".displaybox").css("height", "50%");
  } else {
    $(".no-3d-settingbar").css("--settingbar-display", "flex");
    $(".body").css("transform-origin", "left");
    $(".body").css("transform", "translateX(-50vw)");
    window.scrollTo(0, 0);
    $("body").css("overflow", "hidden");
    $(".displaybox").css("height", "50%");
  }
  return false;
}

function closesettingbar() {
  if (getcurrentmode() === "true") {
    $(".settingbar").css("--settingbar-display", "none");
    $(".body").css("transform-origin", "");
    $(".body").css("transform", "");
    $(".settingbar").css("transform", "rotateY(90deg)");
    $("body").css("overflow", "");
    $(".displaybox").css("height", "");
  } else {
    $(".no-3d-settingbar").css("--settingbar-display", "none");
    $(".body").css("transform-origin", "");
    $(".body").css("transform", "");
    $("body").css("overflow", "");
    $(".displaybox").css("height", "");
  }
}
function dmode() {
  if ($("#3dmode").is(":checked")) {
    setcurrentmode("true");
    $(".no-3d-sidebar").addClass("sidebar");
    $(".no-3d-sidebar .closebtn").text("Close");
    $(".no-3d-sidebar").removeClass("no-3d-sidebar");
    $(".no-3d-settingbar").addClass("settingbar");
    $(".no-3d-settingbar").removeClass("no-3d-settingbar");
    $(".settingbar").css("--settingbar-display", "flex");
    $(".body").css("transform-origin", "left");
    $(".body").css("transform", "rotateY(-45deg) translateX(-50vw)");
    $(".settingbar").css("transform", "rotateY(0) skewY(-1deg)");
    window.scrollTo(0, 0);
    $("body").css("overflow", "hidden");
    $(".displaybox").css("height", "50%");
  } else {
    setcurrentmode("false");
    $(".sidebar").addClass("no-3d-sidebar");
    $(".sidebar .closebtn").text("X");
    $(".sidebar").removeClass("sidebar");
    $(".settingbar").addClass("no-3d-settingbar");
    $(".settingbar").css("transform", "rotateY(0) skewY(-0deg)");
    $(".settingbar").removeClass("settingbar");
    $(".no-3d-settingbar").css("--settingbar-display", "flex");
    $(".body").css("transform-origin", "left");
    $(".body").css("transform", "translateX(-50vw)");
    window.scrollTo(0, 0);
    $("body").css("overflow", "hidden");
    $(".displaybox").css("height", "50%");
  }
}
function search(input) {
  let value = document.getElementById("search").value;
  if (value === "$") return;
  value = value.replace("$", "");
  const startsWith = keys.filter((x) =>
    x.toLowerCase().startsWith(value.toLowerCase()),
  );
  const includes = keys.filter((x) =>
    x.toLowerCase().includes(value.toLowerCase()),
  );
  const set = Array.from(new Set(startsWith.concat(includes)));
  const results = set.map((x) => {
    return \`                 <a href="\${datas[x].name}.html">\${datas[x].name}</a>\`;
  });
  $("#functions").empty();
  $("#functions").html(\`
    \${results.join("\\n")}
  \`);
}

function opensidenav() {
  if ($(".sideslide").text() === ">") {
    $(".sidenav").css("width", "auto");
    $(".sidenav").css("background-color", "var(--sidebar-bg-color)");
    $(".sideinside").css("display", "block");
    if($(window).width() < 720){
      $(".sideinside").css("overflow-y", "scroll");
      $(".sideclose").css("display","block");
        $(".sidenav").css("width", "90%");
    }
    else {
    $(".sideslide").css("margin-left", "500px");
    }
    $(".sideslide").text("<");
  } else {
    $(".sidenav").css("width", "");

      $(".sidenav").css("background-color", "");
      $(".sideinside").css("display", "");

    $(".sideslide").css("margin-left", "");
    $(".sideslide").text(">");
  }
}

`)