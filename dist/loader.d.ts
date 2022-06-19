import { AoiClient } from "aoi.js";
import { Collection } from "discord.js";
import { Command } from "./command";
export declare class LoadCommands {
    client: AoiClient<unknown>;
    paths: {
        path: string;
        commandsLocation: Record<string, Collection<number, Command>>;
        debug: boolean;
        keys: string[];
    }[];
    uglify: boolean;
    colors: {
        [x: string]: any;
    };
    constructor(client: AoiClient, uglify?: boolean, addClassInClient?: boolean);
    load(client: Collection<string, Collection<number, Command>>, path: string, debug?: boolean): Promise<void>;
    update(debug?: boolean): Promise<void>;
    setColors(c?: {
        failLoad: null;
        walking: null;
        failedWalking: null;
        loaded: null;
        typeError: null;
        noData: null;
    }): void;
    get allColors(): Record<string, string>;
    get themes(): {
        default: {
            walking: string[];
            failedWalking: {
                name: string[];
                text: string[];
            };
            typeError: {
                command: string[];
                type: string[];
                text: string[];
            };
            failLoad: {
                command: string[];
                type: string[];
                text: string[];
            };
            loaded: {
                command: string[];
                type: string[];
                text: string[];
            };
        };
        diff: {
            walking: string[];
            failedWalking: {
                text: string[];
                name: string[];
            };
            typeError: {
                command: string[];
                type: string[];
                text: string[];
            };
            failLoad: {
                command: string[];
                type: string[];
                text: string[];
            };
            loaded: {
                command: string[];
                type: string[];
                text: string[];
            };
        };
    };
}
//# sourceMappingURL=loader.d.ts.map