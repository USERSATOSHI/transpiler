import { Scope } from "./scope";
import { Transpiler } from "./transpiler";
import { CommandData, CommandTypes } from "./typings/interface";

export class Command {
  name: string;
  type: CommandTypes;
  code: string;
  __compiled__!: {
    func: Function;
    scope: Scope[];
    code: string;
  };
  __path__?: string;
  __uglify__: boolean;
  load: boolean;
  aliases?: string[];
  constructor(data: CommandData) {
    this.name = data.name;
    this.type = data.type;
    this.code = data.code;
    this.__uglify__ = data.__uglify__;
    this.__path__ = data.__path__;
    Object.defineProperty(this, "__compiled__", {
      value: Transpiler(
        data.code,
        true,
        { sendFunction: this.type === "slashCommand" ? "__$DISCORD_DATA$__.interaction.reply" : undefined },
        data.__uglify__,
      ),
      writable: false,
      enumerable: false,
    });
    this.load = true;
    this.aliases = data.aliases;
  }
}
