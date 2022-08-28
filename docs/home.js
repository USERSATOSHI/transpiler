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
var original_width = 0;
$( document ).ready( async function ()
{
  
$("#copy").click(function () {
    $("#copy").text("done");
    $(this).attr("id", "copied");
    const text = `const { Transpiler, LoadCommands, onMessage } = require( "@akarui/transpiler" );

const { AoiClient } = require( "aoi.js" ); //aoi.js ( version: 6.0.0 )
const { Collection } = require( "@discordjs/collection" );

const client = new AoiClient({
  token: "token",
  prefix: "!",
  intents: [ "Guilds", "GuildMessages", "MessageContent" ],
});

onMessage( client );

client.cmds = {
  basicCommand: new Collection(),
  slashCommand: new Collection(),
};

const loader = new LoadCommands( client, true );

loader.load( client.cmds, "./commands/" );

client.start();`;

    navigator.clipboard.writeText(text);
    const t = setTimeout(() => {
        $("#copied").text("content_copy");
        $("#copied").attr("id", "copy");
        clearTimeout(t);
    }, 5000);
});

  original_width = window.screen.width;
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
    $("#particleloader").remove();
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
      $(".navbardatas").html(`<div class="navbarbtns">
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
        </div>`);
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
    $(".navbardatas").html(`<div class="navbarbtns">
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
        </div>`);
  } else if (original_width > 720 && window.screen.width > 720) {
    $(".no-3d-sidebar").addClass("sidebar");
    $(".sidebar .closebtn").text("Close");
    $("#setbtext").text("settings");
    $(".no-3d-sidebar").removeClass("no-3d-sidebar");
    $(".navbar .navbarbtns").css("display", "");
    $(".navbardatas").addClass("settingbar");
    $(".navbardatas").html(``);
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
    window.scrollTo(0, 0);
    $(".body").css("--body-pseudo-display", "block");
    $(".sidebar").css("--sidebar-display", "flex");
    $(".body").css(
      "transform",
      "scale(0.5) skewY(45deg) rotateY(120deg) translateX(50vw) translateY(-150vh)",
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
