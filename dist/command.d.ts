import { Scope } from "./scope";
import { CommandData, CommandTypes } from "./typings/interface";
export declare class Command {
    name: string;
    type: CommandTypes;
    code: string;
    __compiled__: {
        func: Function;
        scope: Scope[];
        code: string;
    };
    __path__?: string;
    __uglify__: boolean;
    load: boolean;
    aliases?: string[];
    constructor(data: CommandData);
}
//# sourceMappingURL=command.d.ts.map