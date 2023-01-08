"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientWrapper = void 0;
const discord_js_1 = require("discord.js");
const transpiler_1 = require("./transpiler");
class ClientWrapper {
    constructor(client) {
        this.client = client;
        this.cmds = {
            basicCommand: new discord_js_1.Collection(),
            interactionCommand: new discord_js_1.Collection(),
        };
        this.Transpiler = transpiler_1.Transpiler;
        this.prefixes = Array.isArray(client.prefix) ? client.prefix : [client.prefix];
    }
}
exports.ClientWrapper = ClientWrapper;
//# sourceMappingURL=clientWrapper.js.map