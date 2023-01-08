import { Bot } from "aoi.js";
import { Collection } from "discord.js";
import { Command } from "./command";
export declare class ClientWrapper {
    client: Bot;
    cmds: {
        basicCommand: Collection<string, Command>;
        interactionCommand: Collection<string, Command>;
    };
    Transpiler: Function;
    prefixes: string[];
    constructor(client: Bot);
}
//# sourceMappingURL=clientWrapper.d.ts.map