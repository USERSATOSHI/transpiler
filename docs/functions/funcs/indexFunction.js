
const keys = [
  '$activity',
  '$addActionRow',
  '$addButton',
  '$addField',
  '$addObjectProperty',
  '$and',
  '$author',
  '$authorAvatar',
  '$authorId',
  '$break',
  '$catch',
  '$channelId',
  '$channelName',
  '$channelSendMessage',
  '$checkCondition',
  '$clientId',
  '$clientOwnerId',
  '$clientToken',
  '$color',
  '$commandId',
  '$commandName',
  '$comment',
  '$cpu',
  '$createArray',
  '$createObject',
  '$customId',
  '$deleteObjectProperty',
  '$description',
  '$divide',
  '$djsEval',
  '$editMessage',
  '$else',
  '$elseIf',
  '$endsWith',
  '$env',
  '$ephemeral',
  '$eval',
  '$finally',
  '$footer',
  '$get',
  '$getObject',
  '$guildId',
  '$has',
  '$if',
  '$image',
  '$inc',
  '$includes',
  '$isBot',
  '$isNumber',
  '$isServerAvailable',
  '$isServerLarge',
  '$isServerPartnered',
  '$isServerPremiumProgressBarEnabled',
  '$isServerVerified',
  '$let',
  '$log',
  '$message',
  '$onlyIf',
  '$ping',
  '$ram',
  '$slashOption',
  '$sum',
  '$try',
  '$while'
]
const datas = {"$let":{"name":"$let","brackets":true,"optional":false,"type":"setter","fields":[{"name":"name","type":"string","required":true},{"name":"value","type":"string","required":true}],"version":"1.0.0","default":["void","void"],"returns":"void","description":"Sets the value of the variable"},"$get":{"name":"$get","brackets":true,"optional":false,"type":"getter","fields":[{"name":"name","type":"string","required":true}],"version":"1.0.0","default":["void"],"returns":"any","description":"Gets the value of the variable"},"$log":{"name":"$log","brackets":true,"optional":false,"type":"function","fields":[{"name":"text","type":"string","required":true}],"version":"1.0.0","default":["void"],"returns":"void","description":"Logs the text"},"$ping":{"name":"$ping","brackets":false,"optional":true,"type":"getter","fields":[],"default":[],"returns":"number","description":"Returns the bot's ping","version":"1.0.0"},"$authorId":{"name":"$authorId","brackets":false,"optional":true,"type":"getter","fields":[],"default":[],"version":"1.0.0","returns":"Snowflake","description":"Returns the author's ID"},"$clientOwnerId":{"name":"$clientOwnerId","brackets":false,"optional":true,"type":"getter","version":"1.0.0","fields":[{"name":"separator","type":"string","required":false}],"default":[","],"returns":"string","description":"Returns the client's owner ID"},"$channelId":{"name":"$channelId","brackets":true,"optional":true,"type":"getter","fields":[{"name":"channel","type":"string","required":true}],"version":"1.0.0","default":[""],"returns":"Snowflake","description":"Returns the channel's ID"},"$djsEval":{"name":"$djsEval","brackets":true,"optional":false,"type":"function_getter","fields":[{"name":"output","type":"string","required":true},{"name":"code","type":"string","required":true}],"version":"1.0.0","default":["void","void"],"returns":"any","description":"Evaluates the provided Js code"},"$onlyIf":{"name":"$onlyIf","brackets":true,"optional":false,"type":"scope","fields":[{"name":"condition","type":"string","required":true},{"name":"errorMsg","type":"string","required":false}],"version":"1.0.0","default":["void",""],"returns":"void","description":"If statement"},"$activity":{"name":"$activity","brackets":true,"optional":true,"type":"getter","fields":[{"name":"userId","type":"string","required":false},{"name":"guildId","type":"string","required":false},{"name":"separator","type":"string","required":false}],"version":"1.0.0","description":"Returns the activity of provided user","default":["__$DISCORD_DATA$__.author?.id","__$DISCORD_DATA$__.guild?.id",","],"returns":"string"},"$addButton":{"name":"$addButton","brackets":false,"optional":false,"fields":[{"name":"label","type":"string","required":false},{"name":"style","type":"string | number","required":true},{"name":"customId | url","type":"string","required":true},{"name":"disabled","type":"boolean","required":false},{"name":"emoji","type":"string","required":false}],"default":["","void","void","no",""],"version":"1.0.0","description":"Adds a button to the ActionRow","returns":"void","type":"setter"},"$addActionRow":{"name":"$addActionRow","brackets":false,"optional":false,"fields":[],"type":"setter","default":[],"version":"1.0.0","returns":"void","description":"Adds a row to the components table"},"$and":{"name":"$and","type":"getter","brackets":true,"optional":false,"version":"1.0.0","fields":[{"name":"condition","type":"string","required":true}],"default":["void"],"returns":"boolean","description":"Returns true if all conditions are true"},"$author":{"name":"$author","type":"setter","brackets":true,"optional":false,"fields":[{"name":"index","type":"number","required":false},{"name":"author","type":"string","required":true},{"name":"iconUrl","type":"string","required":false},{"name":"url","type":"string","required":false}],"version":"1.0.0","default":["1","void","",""],"returns":"void","description":"Sets the author of the embed"},"$while":{"name":"$while","type":"scope","brackets":true,"optional":false,"fields":[{"name":"condition","type":"string","required":true},{"name":"code","type":"string","required":true}],"version":"1.0.0","default":["void","void"],"returns":"void","description":"While statement"},"$break":{"name":"$break","type":"function","brackets":false,"optional":false,"fields":[],"version":"1.0.0","default":[],"returns":"void","description":"Breaks out of a loop"},"$sum":{"name":"$sum","type":"getter","brackets":true,"optional":false,"fields":[{"name":"numbers","type":"number","required":true}],"version":"1.0.0","default":["void"],"returns":"number","description":"Returns the sum of the numbers"},"$addField":{"name":"$addField","type":"setter","brackets":true,"optional":false,"fields":[{"name":"index","type":"number","required":false},{"name":"name","type":"string","required":true},{"name":"value","type":"string","required":true},{"name":"inline","type":"boolean","required":false}],"version":"1.0.0","description":"Adds a field to the Embed","default":["1","void","void","no"],"returns":"void"},"$inc":{"name":"$inc","type":"function","brackets":true,"optional":false,"fields":[{"name":"variable","type":"string","required":true},{"name":"incrementFunction","type":"function","required":false}],"version":"1.0.0","default":["void","++"],"extra":{"example":"$increment[$get[i];++]"},"returns":"void","description":"Increments the variable"},"$if":{"name":"$if","brackets":true,"optional":false,"type":"scope","fields":[{"name":"condition","type":"string","required":true},{"name":"code","type":"string","required":true}],"version":"1.0.0","default":["void","void"],"returns":"void","description":"If statement"},"$elseIf":{"name":"$elseIf","brackets":true,"optional":false,"type":"scope","fields":[{"name":"condition","type":"string","required":true},{"name":"code","type":"string","required":false}],"default":["void",""],"returns":"void","version":"1.0.0","description":"Else if statement"},"$else":{"name":"$else","brackets":true,"optional":false,"type":"scope","fields":[{"name":"code","type":"string","required":false}],"default":["void"],"version":"1.0.0","returns":"void","description":"Else statement"},"$endsWith":{"name":"$endsWith","brackets":true,"optional":false,"type":"getter","fields":[{"name":"text","type":"string","required":true},{"name":"search","type":"string","required":true}],"default":["void","void"],"version":"1.0.0","returns":"boolean","description":"Checks if the text ends with the search"},"$ephemeral":{"name":"$ephemeral","type":"setter","brackets":false,"optional":false,"fields":[],"default":[],"returns":"void","version":"1.0.0","description":"Sets the ephemeral value"},"$eval":{"name":"$eval","type":"function","brackets":true,"optional":false,"fields":[{"name":"output","type":"boolean","required":true},{"name":"code","type":"string","required":true}],"default":["void","void"],"returns":"any","version":"1.0.0","description":"Evaluates the code"},"$footer":{"name":"$footer","type":"setter","brackets":true,"optional":false,"fields":[{"name":"index","type":"number","required":false},{"name":"text","type":"string","required":true},{"name":"iconUrl","type":"string","required":false}],"version":"1.0.0","default":["1","void",""],"returns":"void","description":"Sets the footer of the embed"},"$guildId":{"name":"$guildId","brackets":true,"optional":true,"type":"getter","fields":[{"name":"guildName","type":"string","required":false}],"version":"1.0.0","default":[""],"returns":"Snowflake","description":"Returns the guild's ID"},"$has":{"name":"$has","brackets":true,"optional":false,"type":"getter","fields":[{"name":"name","type":"string","required":true}],"version":"1.0.0","default":["void"],"returns":"boolean","description":"Checks if the variable exists"},"$message":{"name":"$message","brackets":true,"optional":true,"type":"getter","fields":[{"name":"arg","type":"number","required":false}],"version":"1.0.0","default":[""],"returns":"string","description":"Returns the message"},"$channelName":{"name":"$channelName","brackets":false,"optional":true,"type":"getter","version":"1.0.0","fields":[{"name":"channelId","type":"Snowflake","required":true}],"default":[""],"returns":"string","description":"Returns the channel's name"},"$channelSendMessage":{"name":"$channelSendMessage","type":"scope_getter","brackets":true,"optional":false,"fields":[{"name":"channel","type":"Snowflake","required":true},{"name":"message","type":"string","required":true},{"name":"output","type":"boolean","required":false}],"version":"1.0.0","default":["void","void","no"],"returns":"?string","description":"Sends a message to a channel"},"$checkCondition":{"name":"$checkCondition","type":"getter","brackets":true,"optional":false,"fields":[{"name":"condition","type":"string","required":true}],"version":"1.0.0","default":["void"],"returns":"boolean","description":"Checks the condition"},"$clientId":{"name":"$clientId","brackets":false,"optional":true,"type":"getter","fields":[],"default":[],"version":"1.0.0","returns":"Snowflake","description":"Returns the client's ID"},"$clientToken":{"name":"$clientToken","brackets":false,"optional":true,"type":"getter","version":"1.0.0","fields":[],"default":[],"returns":"string","description":"Returns the client's token"},"$color":{"name":"$color","type":"setter","brackets":true,"optional":false,"fields":[{"name":"index","type":"number","required":false},{"name":"color","type":"string | number","required":true}],"version":"1.0.0","default":["1","void"],"returns":"void","description":"Sets the color of the embed"},"$commandId":{"name":"$commandId","type":"getter","brackets":false,"optional":false,"version":"1.0.0","fields":[],"default":[],"returns":"Snowflake","description":"Returns the command's ID"},"$commandName":{"name":"$commandName","type":"getter","brackets":false,"optional":false,"version":"1.0.0","fields":[],"default":[],"returns":"string","description":"Returns the command's name"},"$comment":{"name":"$comment","type":"scope","brackets":true,"optional":false,"version":"1.0.0","fields":[{"name":"comment","type":"string","required":true}],"default":["void"],"returns":"void","description":"Converts provided code to a comment"},"$customId":{"name":"$customId","type":"getter","brackets":false,"version":"1.0.0","optional":false,"fields":[],"default":[],"returns":"Snowflake","description":"Returns the custom ID"},"$description":{"name":"$description","type":"setter","brackets":true,"optional":false,"version":"1.0.0","fields":[{"name":"index","type":"number","required":false},{"name":"text","type":"string","required":true}],"default":["1","void"],"returns":"void","description":"Sets the description of the embed"},"$divide":{"name":"$divide","type":"getter","brackets":true,"optional":false,"fields":[{"name":"numbers","type":"number","required":true}],"version":"1.0.0","default":["void"],"returns":"number","description":"Divides the numbers"},"$editMessage":{"name":"$editMessage","type":"scope","brackets":true,"optional":false,"fields":[{"name":"channelId","type":"Snowflake","required":true},{"name":"messageId","type":"Snowflake","required":true},{"name":"content","type":"string","required":true}],"default":["void","void","void"],"returns":"void","version":"1.0.0","description":"Edits a message"},"$slashOption":{"name":"$slashOption","type":"getter","brackets":true,"optional":true,"fields":[{"name":"field","type":"string","required":true}],"version":"1.0.0","default":["void"],"returns":"any","description":"Returns the value of the slash option"},"$cpu":{"name":"$cpu","brackets":true,"optional":true,"version":"1.0.0","type":"function_getter","fields":[{"name":"type","type":"process|os","required":false}],"default":["process"],"returns":"number","description":"Returns the CPU usage"},"$ram":{"name":"$ram","brackets":true,"optional":true,"type":"getter","fields":[{"name":"type","type":"rss|heapUsed|heapTotal|external|arrayBuffer","required":false}],"version":"1.0.0","default":["rss"],"returns":"number","description":"Returns the bot's ram usage"},"$image":{"name":"$image","type":"setter","brackets":true,"optional":false,"fields":[{"name":"index","type":"number","required":false},{"name":"url","type":"string","required":true}],"version":"1.0.0","default":["1","void"],"returns":"void","description":"Sets the image of the embed"},"$includes":{"name":"$includes","brackets":true,"optional":false,"type":"getter","fields":[{"name":"text","type":"string","required":true},{"name":"search","type":"string","required":true}],"version":"1.0.0","default":["void","void"],"returns":"boolean","description":"Checks if the text includes the search"},"$authorAvatar":{"name":"$authorAvatar","brackets":true,"optional":true,"type":"getter","fields":[{"name":"size","type":"number","required":false},{"name":"dynamic","type":"boolean","required":false},{"name":"format","type":"string","required":false}],"version":"1.0.0","default":["4096","yes","webp"],"returns":"string","description":"Returns the avatar of the author"},"$isBot":{"name":"$isBot","brackets":true,"optional":true,"type":"function_getter","fields":[{"name":"name","type":"string","required":false}],"version":"1.0.0","default":["__$DISCORD_DATA$__.author?.id"],"returns":"boolean","description":"Checks if the author is a bot"},"$isNumber":{"name":"$isNumber","brackets":true,"optional":false,"type":"getter","fields":[{"name":"query","type":"any","required":true}],"version":"1.0.0","default":["void"],"returns":"boolean","description":"Checks if the query is a number"},"$isServerPremiumProgressBarEnabled":{"name":"$isServerPremiumProgressBarEnabled","brackets":true,"optional":true,"type":"getter","fields":[{"name":"guildId","type":"Snowflake","required":false}],"version":"1.0.0","default":["__$DISCORD_DATA$__.guild?.id"],"returns":"boolean","description":"Checks if the server has premium progress bar enabled"},"$isServerAvailable":{"name":"$isServerAvailable","brackets":true,"optional":true,"type":"getter","fields":[{"name":"guildId","type":"Snowflake","required":false}],"version":"1.0.0","default":["__$DISCORD_DATA$__.guild?.id"],"returns":"boolean","description":"Checks if the server is available"},"$isServerLarge":{"name":"$isServerLarge","brackets":true,"optional":true,"type":"getter","fields":[{"name":"guildId","type":"Snowflake","required":false}],"version":"1.0.0","default":["__$DISCORD_DATA$__.guild?.id"],"returns":"boolean","description":"Checks if the server is large"},"$isServerPartnered":{"name":"$isServerPartnered","brackets":true,"optional":true,"type":"getter","fields":[{"name":"guildId","type":"Snowflake","required":false}],"version":"1.0.0","default":["__$DISCORD_DATA$__.guild?.id"],"returns":"boolean","description":"Checks if the server is partnered"},"$isServerVerified":{"name":"$isServerVerified","brackets":true,"optional":true,"type":"getter","fields":[{"name":"guildId","type":"Snowflake","required":false}],"version":"1.0.0","default":["__$DISCORD_DATA$__.guild?.id"],"returns":"boolean","description":"Checks if the server is verified"},"$env":{"name":"$env","brackets":true,"optional":false,"type":"getter","fields":[{"name":"env","type":"string","required":true}],"description":"","default":["void"],"version":"1.0.0","returns":"?string"},"$try":{"name":"$try","brackets":true,"optional":false,"type":"scope","fields":[{"name":"code","type":"string","required":true}],"version":"1.0.0","description":"try statement that tests if a code works","default":["void"],"returns":"void"},"$catch":{"name":"$catch","brackets":true,"optional":false,"type":"scope","fields":[{"name":"code","type":"string","required":true}],"version":"1.0.0","description":"catch statement that executes when try fails","default":["void"],"returns":"void"},"$finally":{"name":"$finally","brackets":true,"optional":false,"type":"scope","fields":[{"name":"code","type":"string","required":true}],"version":"1.0.0","description":"final statement that executes after try / catch","default":["void"],"returns":"void"},"$createObject":{"name":"$createObject","brackets":true,"optional":false,"type":"setter","version":"1.0.0","fields":[{"name":"name","type":"string","required":true},{"name":"object","type":"json","required":true}],"description":"creates an Object","default":["void","void"],"returns":"void"},"$addObjectProperty":{"name":"$addObjectProperty","brackets":true,"optional":false,"type":"function","fields":[{"name":"name","type":"string","required":true},{"name":"key","type":"string","required":true},{"name":"value","type":"any","required":true}],"version":"1.0.0","description":"adds a value to the key in the object","default":["void","void","void"],"returns":"void"},"$deleteObjectProperty":{"name":"$deleteObjectProperty","brackets":true,"optional":false,"type":"function","version":"1.0.0","fields":[{"name":"name","type":"string","required":true},{"name":"key","type":"string","required":true}],"description":"deletes a key from the object","default":["void","void"],"returns":"void"},"$getObject":{"name":"$getObject","brackets":true,"optional":false,"type":"getter","fields":[{"name":"name","type":"string","required":true}],"version":"1.0.0","description":"returns the object","default":["void"],"returns":"object"},"$createArray":{"name":"$createArray","brackets":true,"optional":false,"type":"setter","fields":[{"name":"varName","type":"string","required":true},{"name":"...elements","type":"any","required":true}],"description":"creates an Array","default":["void","void"],"returns":"void","version":"1.0.0"}}

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
      $(".navbardatas").html(`<div class="navbarbtns">
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
    return `                 <a href="${datas[x].name}.html">${datas[x].name}</a>`;
  });
  $("#functions").empty();
  $("#functions").html(`
    ${results.join("\n")}
  `);
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

