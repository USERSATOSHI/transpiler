import {
  ActionRow,
  ButtonComponent,
  EmbedBuilder,
  EmbedData,
  MessageAttachment,
  NewsChannel,
  SelectMenuComponent,
  Snowflake,
  StickerResolvable,
  TextChannel,
  TextInputComponent,
  ThreadChannel,
} from "discord.js";
import { escapeResult, escapeVars, parseResult } from "./util";
import { inspect } from "util";
import { parseString } from "./stringparser";
export class Scope {
  name: string;
  parent: string | undefined;
  children: Scope[] = [];
  sendData: {
    content: string;
  };
  embeds: EmbedData[] = [];
  components: ActionRow<
    ButtonComponent | SelectMenuComponent | TextInputComponent
  >[] = [];
  files: MessageAttachment[] = [];
  stickers: StickerResolvable[] = [];
  variables: string[];
  setters: string;
  rest: string;
  hasSendData: boolean;
  sendFunction: string;
  functions: string;
  addReturn: boolean;
  useChannel?: Snowflake;
  packages: string = "";
  constructor(
    name: string,
    parent?: string,
    code?: string,
    addReturn?: boolean,
  ) {
    this.name = name;
    this.sendFunction = `__$DISCORD_DATA$__.channel.send`;
    this.parent = parent;
    this.hasSendData = false;
    this.sendData = {
      content: code?.replaceAll("`", "#STRING_LITERAL#") || " ",
    };
    this.variables = [];
    this.setters = "";
    this.functions = "";
    this.rest = code?.replaceAll("`", "#STRING_LITERAL#") || "";
    this.addReturn = addReturn ?? false;
  }
  addVariables(scopeVars: string[]) {
    this.variables.push(...scopeVars);
  }
  replaceLast(str: string, replacer: string, replacedTo: string) {
    const index = str.lastIndexOf(replacer);
    if (index === -1) return str;
    return (
      str.substring(0, index) +
      replacedTo +
      str.substring(index + replacer.length)
    );
  }
  replace(str: string, replacer: string, replacedTo: string) {
    const index = str.indexOf(replacer);
    if (index === -1) return str;
    return (
      str.substring(0, index) +
      replacedTo +
      str.substring(index + replacer.length)
    );
  }
  addChild(child: string) {
    this.children.push(new Scope(child, this.name));
  }
  getChild(name: string) {
    return this.children.find((child) => child.name === name);
  }
  removeChild(name: string) {
    this.children = this.children.filter((child) => child.name !== name);
  }
  toExecuteString(sendMessage: boolean = true) {
    const sendData: Record<string, string> = { ...this.sendData };
    sendData.embeds = escapeResult(escapeVars(`${this.name}_embeds`));
    sendData.components = escapeResult(escapeVars(`${this.name}_components`));
    sendData.files = escapeResult(escapeVars(`${this.name}_files`));
    sendData.stickers = escapeResult(escapeVars(`${this.name}_stickers`));
    sendData.content = sendData.content.replaceAll("\n", "#NEW_LINE#");
    if (
      sendData.content.replaceAll("#NEW_LINE#", "").trim() !== "" ||
      this.embeds.length ||
      this.files.length ||
      this.stickers.length
    )
      this.hasSendData = true;
    else this.hasSendData = false;

    console.log({ h: this.hasSendData });

    let parsedStr = parseString(
      sendData.content.replaceAll("#NEW_LINE#", "\n").trim(),
    );
    parsedStr = parsedStr.trim() === "" ? " " : parsedStr.trim();
    console.log({ parsedStr });
    console.log({ res: this.rest, content: this.sendData.content });
    this.rest = this.replaceLast(
      this.rest.trim(),
      this.sendData.content.trim(),
      "",
    );
    console.log({
      restafter: this.rest,
      content: this.sendData.content,
      c: sendData.content,
    });
    const sent = `{
  content: ${parsedStr.replaceAll("\\n", "#NEW_LINE#")},
  embeds: ${escapeVars(`${this.name}_embeds`)},
  components: ${escapeVars(`${this.name}_components`)},
  files: ${escapeVars(`${this.name}_files`)},
  stickers: ${escapeVars(`${this.name}_stickers`)},
    }`.replaceAll("#NEW_LINE#", "\\\\n");
    console.log({ sent });
    return parseResult(
      `async function ${this.name}(__$DISCORD_DATA$__) {\n` +
        `const ${escapeVars(`${this.name}_embeds`)} = [];\n` +
        `const ${escapeVars(`${this.name}_components`)} = [];\n` +
        `const ${escapeVars(`${this.name}_files`)} = [];\n` +
        `const ${escapeVars(`${this.name}_stickers`)} = [];\n` +
        `${this.packages}` +
        `${this.setters}\n\n${
          this.functions
        }\n\n${this.rest.trim()}\n\n`.trim() +
        `\n${(() => {
          if (this.hasSendData && sendMessage) {
            console.log({
              sendata: `${sent}`,
              replacer: `content: '${sendData.content}'`,
            });
            return `${this.addReturn ? "return " : ""} await ${
              this.useChannel
                ? `__$DISCORD_DATA$__.client.channels.cache.get(${parseString(
                    this.useChannel,
                  )})?.send`
                : this.sendFunction
            }(${sent});`;
          } else {
            return "";
          }
        })()}` +
        "\n}" +
        `\n ${this.addReturn ? "return " : ""} ${
          this.name
        }(__$DISCORD_DATA$__);`,
    ).replaceAll("#STRING_LITERAL#", "`");
  }
  getExecutable(sendMessage: boolean = true) {
    const sendData: Record<string, string> = { ...this.sendData };
    sendData.embeds = escapeResult(escapeVars(`${this.name}_embeds`));
    sendData.components = escapeResult(escapeVars(`${this.name}_components`));
    sendData.files = escapeResult(escapeVars(`${this.name}_files`));
    sendData.stickers = escapeResult(escapeVars(`${this.name}_stickers`));
    sendData.content = sendData.content.replaceAll("\n", "#NEW_LINE#");
    if (
      sendData.content.replaceAll("#NEW_LINE#", "").trim() !== "" ||
      this.embeds.length ||
      this.files.length ||
      this.stickers.length
    )
      this.hasSendData = true;
    else this.hasSendData = false;

    console.log({ h: this.hasSendData });

    let parsedStr = parseString(
      sendData.content.replaceAll("#NEW_LINE#", "\n").trim(),
    ).replaceAll("#STRING_LITERAL#", "`");
    parsedStr = parsedStr.trim() === "" ? " " : parsedStr.trim();
    console.log({ parsedStr });
    console.log({ res: this.rest, content: this.sendData.content });
    this.rest = this.replaceLast(
      this.rest.trim(),
      this.sendData.content.trim(),
      "",
    );
    console.log({
      restafter: this.rest,
      content: this.sendData.content,
      c: sendData.content,
    });
    const sent = `{
  content: ${parsedStr.replaceAll("\\n", "#NEW_LINE#")},
  embeds: ${escapeVars(`${this.name}_embeds`)},
  components: ${escapeVars(`${this.name}_components`)},
  files: ${escapeVars(`${this.name}_files`)},
  stickers: ${escapeVars(`${this.name}_stickers`)},
    }`.replaceAll("#NEW_LINE#", "\\\\n");

    console.log({ sent });
    return parseResult(
      `const ${escapeVars(`${this.name}_embeds`)} = [];\n` +
        `const ${escapeVars(`${this.name}_components`)} = [];\n` +
        `const ${escapeVars(`${this.name}_files`)} = [];\n` +
        `const ${escapeVars(`${this.name}_stickers`)} = [];\n` +
        `${this.packages}` +
        `${this.setters}\n\n${
          this.functions
        }\n\n${this.rest.trim()}\n\n`.trim() +
        `\n${(() => {
          if (this.hasSendData && sendMessage) {
            console.log({
              sendata: `${sent}`,
              replacer: `content: '${sendData.content}'`,
              replacer2: `content: "${sendData.content}"`,
            });
            return `${this.addReturn ? "return " : ""} await ${
              this.useChannel
                ? `__$DISCORD_DATA$__.client.channels.cache.get(\`${this.useChannel}\`)`
                : "__$DISCORD_DATA$__.channel"
            }.send(${sent});`;
          } else {
            return "";
          }
        })()}`,
    ).replaceAll("#STRING_LITERAL#", "`");
  }
  toString(sendMessage: boolean = true) {
    const sendData: Record<string, string> = { ...this.sendData };
    sendData.embeds = escapeResult(escapeVars(`${this.name}_embeds`));
    sendData.components = escapeResult(escapeVars(`${this.name}_components`));
    sendData.files = escapeResult(escapeVars(`${this.name}_files`));
    sendData.stickers = escapeResult(escapeVars(`${this.name}_stickers`));
    sendData.content = sendData.content.replaceAll("\n", "#NEW_LINE#");
    if (
      sendData.content.replaceAll("#NEW_LINE#", "").trim() !== "" ||
      this.embeds.length ||
      this.files.length ||
      this.stickers.length
    )
      this.hasSendData = true;
    else this.hasSendData = false;

    console.log({ h: this.hasSendData });

    let parsedStr = parseString(
      sendData.content.replaceAll("#NEW_LINE#", "\n").trim(),
    );
    parsedStr =
      parsedStr.trim().replaceAll("#STRING_LITERAL#", "\\`") === ""
        ? " "
        : parsedStr.trim().replaceAll("#STRING_LITERAL#", "\\`");
    console.log({ parsedStr });
    console.log({ res: this.rest, content: this.sendData.content });
    this.rest = this.replaceLast(
      this.rest.trim(),
      this.sendData.content.trim(),
      "",
    );
    console.log({
      restafter: this.rest,
      content: this.sendData.content,
      c: sendData.content,
    });
    const sent = `{
  content: ${parsedStr.replaceAll("\\n", "#NEW_LINE#")},
  embeds: ${escapeVars(`${this.name}_embeds`)},
  components: ${escapeVars(`${this.name}_components`)},
  files: ${escapeVars(`${this.name}_files`)},
  stickers: ${escapeVars(`${this.name}_stickers`)},
    }`.replaceAll("#NEW_LINE#", "\\\\n");
    console.log({ sent });
    return parseResult(
      `async function ${
        this.name === "global" ? "main" : this.name
      }(__$DISCORD_DATA$__) {\n` +
        `const ${escapeVars(`${this.name}_embeds`)} = [];\n` +
        `const ${escapeVars(`${this.name}_components`)} = [];\n` +
        `const ${escapeVars(`${this.name}_files`)} = [];\n` +
        `const ${escapeVars(`${this.name}_stickers`)} = [];\n` +
        `${this.packages}` +
        `${this.setters}\n\n${
          this.functions
        }\n\n${this.rest.trim()}\n\n`.trim() +
        `\n${(() => {
          if (this.hasSendData && sendMessage) {
            console.log({
              sendata: `${sent}`,
              replacer: `content: '${sendData.content}'`,
            });
            return `${this.addReturn ? "return " : ""} await ${
              this.useChannel
                ? `__$DISCORD_DATA$__.client.channels.cache.get(${parseString(
                    this.useChannel,
                  )})?.send`
                : this.sendFunction
            }(${sent});`;
          } else {
            return "";
          }
        })()}` +
        "\n}",
    ).replaceAll("#STRING_LITERAL#", "`");
  }
  addEmbeds(embeds: EmbedData[]) {
    this.embeds = [...this.embeds, ...embeds];
  }
  toParts(sendMessage: boolean = true) {
    const sendData: Record<string, string> = { ...this.sendData };
    sendData.embeds = escapeResult(escapeVars(`${this.name}_embeds`));
    sendData.components = escapeResult(escapeVars(`${this.name}_components`));
    sendData.files = escapeResult(escapeVars(`${this.name}_files`));
    sendData.stickers = escapeResult(escapeVars(`${this.name}_stickers`));
    sendData.content = sendData.content.replaceAll("\n", "#NEW_LINE#");
    if (
      sendData.content.replaceAll("#NEW_LINE#", "").trim() !== "" ||
      this.embeds.length ||
      this.files.length ||
      this.stickers.length
    )
      this.hasSendData = true;
    else this.hasSendData = false;

    console.log({ h: this.hasSendData });

    let parsedStr = parseString(
      sendData.content.replaceAll("#NEW_LINE#", "\n").trim(),
    );
    parsedStr = parsedStr.trim() === "" ? " " : parsedStr.trim();
    console.log({ parsedStr });
    console.log({ res: this.rest, content: this.sendData.content });
    this.rest = this.replaceLast(
      this.rest.trim(),
      this.sendData.content.trim(),
      "",
    );
    console.log({
      restafter: this.rest,
      content: this.sendData.content,
      c: sendData.content,
    });
    const sent = `{
  content: ${parsedStr.replaceAll("\\n", "#NEW_LINE#")},
  embeds: ${escapeVars(`${this.name}_embeds`)},
  components: ${escapeVars(`${this.name}_components`)},
  files: ${escapeVars(`${this.name}_files`)},
  stickers: ${escapeVars(`${this.name}_stickers`)},
    }`.replaceAll("#NEW_LINE#", "\\\\n");
    console.log({ sent });
    return {
      packages: this.packages,
      setters: this.setters,
      functions: this.functions,
      rest: this.rest,
      hasSendData: this.hasSendData,
      sendData: this.hasSendData && sendMessage ? sent : "",
    };
  }
  toEditString(channel: string, message: string) {
    const sendData: Record<string, string> = { ...this.sendData };
    sendData.embeds = escapeResult(escapeVars(`${this.name}_embeds`));
    sendData.components = escapeResult(escapeVars(`${this.name}_components`));
    sendData.files = escapeResult(escapeVars(`${this.name}_files`));
    sendData.content = sendData.content.replaceAll("\n", "#NEW_LINE#");
    if (
      sendData.content.replaceAll("#NEW_LINE#", "").trim() !== "" ||
      this.embeds.length ||
      this.files.length ||
      this.stickers.length
    )
      this.hasSendData = true;
    else this.hasSendData = false;

    console.log({ h: this.hasSendData });

    let parsedStr = parseString(
      sendData.content.replaceAll("#NEW_LINE#", "\n").trim(),
    );
    parsedStr = parsedStr.trim() === "" ? " " : parsedStr.trim();
    console.log({ parsedStr });
    console.log({ res: this.rest, content: this.sendData.content });
    this.rest = this.replaceLast(
      this.rest.trim(),
      this.sendData.content.trim(),
      "",
    );
    console.log({
      restafter: this.rest,
      content: this.sendData.content,
      c: sendData.content,
    });
    const sent = `{
  content: ${parsedStr.replaceAll("\\n", "#NEW_LINE#")},
  embeds: ${escapeVars(`${this.name}_embeds`)},
  components: ${escapeVars(`${this.name}_components`)},
  files: ${escapeVars(`${this.name}_files`)},
  stickers: ${escapeVars(`${this.name}_stickers`)},
    }`.replaceAll("#NEW_LINE#", "\\\\n");

    console.log({ sent });

    return parseResult(
      `async function ${
        this.name === "global" ? "main" : this.name
      }(__$DISCORD_DATA$__) {\n` +
        `const ${escapeVars(`${this.name}_embeds`)} = [];\n` +
        `const ${escapeVars(`${this.name}_components`)} = [];\n` +
        `const ${escapeVars(`${this.name}_files`)} = [];\n` +
        `const ${escapeVars(`${this.name}_stickers`)} = [];\n` +
        `${this.packages}` +
        `${this.setters}\n\n${
          this.functions
        }\n\n${this.rest.trim()}\n\n`.trim() +
        `\n${(() => {
          if (this.hasSendData) {
            console.log({
              sendata: `${sent}`,
              replacer: `content: '${sendData.content}'`,
            });
            return `${
              this.addReturn ? "return " : ""
            } await ${`__$DISCORD_DATA$__.client.channels.cache.get(${parseString(
              channel,
            )})`}?.messages.fetch(${parseString(
              message,
            )}).then(msg => msg.edit(${sent})).catch(e => {
              throw e;
            });`;
          } else {
            return "";
          }
        })()}` +
        "\n}",
    ).replaceAll("#STRING_LITERAL#", "`");
  }
}
