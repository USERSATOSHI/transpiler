"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const transpiler_1 = require("./transpiler");
class Command {
    name;
    type;
    code;
    __compiled__;
    __path__;
    __uglify__;
    load;
    aliases;
    constructor(data) {
        this.name = data.name;
        this.type = data.type;
        this.code = data.code;
        this.__uglify__ = data.__uglify__;
        this.__path__ = data.__path__;
        Object.defineProperty(this, "__compiled__", {
            value: (0, transpiler_1.Transpiler)(data.code, true, { sendFunction: this.type === "slashCommand" ? "__$DISCORD_DATA$__.interaction.reply" : undefined }, data.__uglify__),
            writable: false,
            enumerable: false,
        });
        this.load = true;
        this.aliases = data.aliases;
    }
}
exports.Command = Command;
//# sourceMappingURL=command.js.map