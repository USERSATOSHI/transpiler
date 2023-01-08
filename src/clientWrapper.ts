import { Bot } from "aoi.js";
import { Collection } from "discord.js";
import { Command } from "./command";
import { Transpiler } from "./transpiler";

export class ClientWrapper {
    client: Bot;
    cmds: {
        basicCommand: Collection<string, Command>;
        interactionCommand: Collection<string, Command>;
    };
    Transpiler: Function;
    prefixes: string[];
    constructor(client: Bot) {
        this.client = client;
        this.cmds = {
            basicCommand: new Collection(),
            interactionCommand: new Collection(),
        };

        this.Transpiler = Transpiler;
        this.prefixes = Array.isArray(client.prefix) ? client.prefix : [client.prefix]
    }
}
