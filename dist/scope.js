"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
const util_1 = require("./util");
const stringparser_1 = require("./stringparser");
class Scope {
    constructor(name, parent, code, addReturn) {
        this.children = [];
        this.embeds = [];
        this.components = [];
        this.files = [];
        this.stickers = [];
        this.ephemeral = false;
        this.packages = "";
        this.name = name;
        this.sendFunction = `__$DISCORD_DATA$__.channel.send`;
        this.parent = parent;
        this.hasSendData = false;
        this.sendData = {
            content: code?.replaceAll("`", "#STRING_LITERAL#") || " ",
        };
        this.variables = [];
        this.objects = {};
        this.env = [];
        this.setters = "";
        this.functions = "";
        this.rest = code?.replaceAll("`", "#STRING_LITERAL#") || "";
        this.addReturn = addReturn ?? false;
    }
    addVariables(scopeVars) {
        this.variables.push(...scopeVars);
    }
    replaceLast(str, replacer, replacedTo) {
        const index = str.lastIndexOf(replacer);
        if (index === -1)
            return str;
        return (str.substring(0, index) +
            replacedTo +
            str.substring(index + replacer.length));
    }
    replace(str, replacer, replacedTo) {
        const index = str.indexOf(replacer);
        if (index === -1)
            return str;
        return (str.substring(0, index) +
            replacedTo +
            str.substring(index + replacer.length));
    }
    addChild(child) {
        this.children.push(new Scope(child, this.name));
    }
    getChild(name) {
        return this.children.find((child) => child.name === name);
    }
    removeChild(name) {
        this.children = this.children.filter((child) => child.name !== name);
    }
    toExecuteString(sendMessage = true) {
        const sendData = { ...this.sendData };
        sendData.embeds = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_embeds`));
        sendData.components = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_components`));
        sendData.files = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_files`));
        sendData.stickers = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_stickers`));
        sendData.content = sendData.content.replaceAll("\n", "#NEW_LINE#");
        if (sendData.content.replaceAll("#NEW_LINE#", "").trim() !== "" ||
            this.embeds.length ||
            this.files.length ||
            this.stickers.length)
            this.hasSendData = true;
        else
            this.hasSendData = false;
        let parsedStr = (0, stringparser_1.parseString)(sendData.content.replaceAll("#NEW_LINE#", "\n").trim());
        parsedStr = parsedStr.trim() === "" ? " " : parsedStr.trim();
        this.rest = this.replaceLast(this.rest.trim(), this.sendData.content.trim(), "");
        const sent = `{
  content: ${parsedStr.replaceAll("\\n", "#NEW_LINE#")},
  embeds: ${(0, util_1.escapeVars)(`${this.name}_embeds`)},
  components: ${(0, util_1.escapeVars)(`${this.name}_components`)},
  files: ${(0, util_1.escapeVars)(`${this.name}_files`)},
  stickers: ${(0, util_1.escapeVars)(`${this.name}_stickers`)},
    }`.replaceAll("#NEW_LINE#", "\\\\n");
        return (0, util_1.parseResult)(`async function ${this.name}(__$DISCORD_DATA$__) {\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_embeds`)} = [];\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_components`)} = [];\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_files`)} = [];\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_stickers`)} = [];\n` +
            `${this.packages}` +
            `${this.setters}\n\n${this.functions}\n\n${this.rest.trim()}\n\n`.trim() +
            `\n${(() => {
                if (this.hasSendData && sendMessage) {
                    return `${this.addReturn ? "return " : ""} await ${this.useChannel
                        ? `__$DISCORD_DATA$__.client.channels.cache.get(${(0, stringparser_1.parseString)(this.useChannel)})?.send`
                        : this.sendFunction}(${sent});`;
                }
                else {
                    return "";
                }
            })()}` +
            "\n}" +
            `\n ${this.addReturn ? "return " : ""} ${this.name}(__$DISCORD_DATA$__);`).replaceAll("#STRING_LITERAL#", "`");
    }
    getExecutable(sendMessage = true) {
        const sendData = { ...this.sendData };
        sendData.embeds = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_embeds`));
        sendData.components = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_components`));
        sendData.files = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_files`));
        sendData.stickers = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_stickers`));
        sendData.content = sendData.content.replaceAll("\n", "#NEW_LINE#");
        if (sendData.content.replaceAll("#NEW_LINE#", "").trim() !== "" ||
            this.embeds.length ||
            this.files.length ||
            this.stickers.length)
            this.hasSendData = true;
        else
            this.hasSendData = false;
        let parsedStr = (0, stringparser_1.parseString)(sendData.content.replaceAll("#NEW_LINE#", "\n").trim()).replaceAll("#STRING_LITERAL#", "`");
        parsedStr = parsedStr.trim() === "" ? " " : parsedStr.trim();
        this.rest = this.replaceLast(this.rest.trim(), this.sendData.content.trim(), "");
        const sent = `{
  content: ${parsedStr.replaceAll("\\n", "#NEW_LINE#")},
  embeds: ${(0, util_1.escapeVars)(`${this.name}_embeds`)},
  components: ${(0, util_1.escapeVars)(`${this.name}_components`)},
  files: ${(0, util_1.escapeVars)(`${this.name}_files`)},
  stickers: ${(0, util_1.escapeVars)(`${this.name}_stickers`)},
  ephemeral: ${this.ephemeral},
}`.replaceAll("#NEW_LINE#", "\\\\n");
        return (0, util_1.parseResult)(`const ${(0, util_1.escapeVars)(`${this.name}_embeds`)} = [];\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_components`)} = [];\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_files`)} = [];\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_stickers`)} = [];\n` +
            `${this.packages}` +
            `${this.setters}\n\n${this.functions}\n\n${this.rest.trim()}\n\n`.trim() +
            `\n${(() => {
                if (this.hasSendData && sendMessage) {
                    return `${this.addReturn ? "return " : ""} await ${this.useChannel
                        ? `__$DISCORD_DATA$__.client.channels.cache.get(\`${this.useChannel}\`)`
                        : "__$DISCORD_DATA$__.channel"}.send(${sent});`;
                }
                else {
                    return "";
                }
            })()}`).replaceAll("#STRING_LITERAL#", "`");
    }
    toString(sendMessage = true) {
        const sendData = { ...this.sendData };
        sendData.embeds = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_embeds`));
        sendData.components = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_components`));
        sendData.files = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_files`));
        sendData.stickers = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_stickers`));
        sendData.content = sendData.content.replaceAll("\n", "#NEW_LINE#");
        if (sendData.content.replaceAll("#NEW_LINE#", "").trim() !== "" ||
            this.embeds.length ||
            this.files.length ||
            this.stickers.length)
            this.hasSendData = true;
        else
            this.hasSendData = false;
        let parsedStr = (0, stringparser_1.parseString)(sendData.content.replaceAll("#NEW_LINE#", "\n").trim());
        parsedStr =
            parsedStr.trim().replaceAll("#STRING_LITERAL#", "\\`") === ""
                ? " "
                : parsedStr.trim().replaceAll("#STRING_LITERAL#", "\\`");
        this.rest = this.replaceLast(this.rest.trim(), this.sendData.content.trim(), "");
        const sent = `{
  content: ${parsedStr.replaceAll("\\n", "#NEW_LINE#")},
  embeds: ${(0, util_1.escapeVars)(`${this.name}_embeds`)},
  components: ${(0, util_1.escapeVars)(`${this.name}_components`)},
  files: ${(0, util_1.escapeVars)(`${this.name}_files`)},
  stickers: ${(0, util_1.escapeVars)(`${this.name}_stickers`)},
    }`.replaceAll("#NEW_LINE#", "\\\\n");
        return (0, util_1.parseResult)(`async function ${this.name === "global" ? "main" : this.name}(__$DISCORD_DATA$__) {\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_embeds`)} = [];\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_components`)} = [];\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_files`)} = [];\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_stickers`)} = [];\n` +
            `${this.packages}` +
            `${this.setters}\n\n${this.functions}\n\n${this.rest.trim()}\n\n`.trim() +
            `\n${(() => {
                if (this.hasSendData && sendMessage) {
                    return `${this.addReturn ? "return " : ""} await ${this.useChannel
                        ? `__$DISCORD_DATA$__.client.channels.cache.get(${(0, stringparser_1.parseString)(this.useChannel)})?.send`
                        : this.sendFunction}(${sent});`;
                }
                else {
                    return "";
                }
            })()}` +
            "\n}").replaceAll("#STRING_LITERAL#", "\\`");
    }
    addEmbeds(embeds) {
        this.embeds = [...this.embeds, ...embeds];
    }
    toParts(sendMessage = true) {
        const sendData = { ...this.sendData };
        sendData.embeds = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_embeds`));
        sendData.components = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_components`));
        sendData.files = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_files`));
        sendData.stickers = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_stickers`));
        sendData.content = sendData.content.replaceAll("\n", "#NEW_LINE#");
        if (sendData.content.replaceAll("#NEW_LINE#", "").trim() !== "" ||
            this.embeds.length ||
            this.files.length ||
            this.stickers.length)
            this.hasSendData = true;
        else
            this.hasSendData = false;
        let parsedStr = (0, stringparser_1.parseString)(sendData.content.replaceAll("#NEW_LINE#", "\n").trim());
        parsedStr = parsedStr.trim() === "" ? " " : parsedStr.trim();
        this.rest = this.replaceLast(this.rest.trim(), this.sendData.content.trim(), "");
        const sent = `{
  content: ${parsedStr.replaceAll("\\n", "#NEW_LINE#")},
  embeds: ${(0, util_1.escapeVars)(`${this.name}_embeds`)},
  components: ${(0, util_1.escapeVars)(`${this.name}_components`)},
  files: ${(0, util_1.escapeVars)(`${this.name}_files`)},
  stickers: ${(0, util_1.escapeVars)(`${this.name}_stickers`)},
    }`.replaceAll("#NEW_LINE#", "\\\\n");
        return {
            packages: this.packages,
            setters: this.setters,
            functions: this.functions,
            rest: this.rest,
            hasSendData: this.hasSendData,
            sendData: this.hasSendData && sendMessage ? sent : "",
        };
    }
    toEditString(channel, message) {
        const sendData = { ...this.sendData };
        sendData.embeds = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_embeds`));
        sendData.components = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_components`));
        sendData.files = (0, util_1.escapeResult)((0, util_1.escapeVars)(`${this.name}_files`));
        sendData.content = sendData.content.replaceAll("\n", "#NEW_LINE#");
        if (sendData.content.replaceAll("#NEW_LINE#", "").trim() !== "" ||
            this.embeds.length ||
            this.files.length ||
            this.stickers.length)
            this.hasSendData = true;
        else
            this.hasSendData = false;
        let parsedStr = (0, stringparser_1.parseString)(sendData.content.replaceAll("#NEW_LINE#", "\n").trim());
        parsedStr = parsedStr.trim() === "" ? " " : parsedStr.trim();
        this.rest = this.replaceLast(this.rest.trim(), this.sendData.content.trim(), "");
        const sent = `{
  content: ${parsedStr.replaceAll("\\n", "#NEW_LINE#")},
  embeds: ${(0, util_1.escapeVars)(`${this.name}_embeds`)},
  components: ${(0, util_1.escapeVars)(`${this.name}_components`)},
  files: ${(0, util_1.escapeVars)(`${this.name}_files`)},
  stickers: ${(0, util_1.escapeVars)(`${this.name}_stickers`)},
    }`.replaceAll("#NEW_LINE#", "\\\\n");
        return (0, util_1.parseResult)(`async function ${this.name === "global" ? "main" : this.name}(__$DISCORD_DATA$__) {\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_embeds`)} = [];\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_components`)} = [];\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_files`)} = [];\n` +
            `const ${(0, util_1.escapeVars)(`${this.name}_stickers`)} = [];\n` +
            `${this.packages}` +
            `${this.setters}\n\n${this.functions}\n\n${this.rest.trim()}\n\n`.trim() +
            `\n${(() => {
                if (this.hasSendData) {
                    return `${this.addReturn ? "return " : ""} await ${`__$DISCORD_DATA$__.client.channels.cache.get(${(0, stringparser_1.parseString)(channel)})`}?.messages.fetch(${(0, stringparser_1.parseString)(message)}).then(msg => msg.edit(${sent})).catch(e => {
              throw e;
            });`;
                }
                else {
                    return "";
                }
            })()}` +
            "\n}").replaceAll("#STRING_LITERAL#", "\\`");
    }
}
exports.Scope = Scope;
//# sourceMappingURL=scope.js.map