import { Scope } from "./scope";
import { EmbedData } from "discord.js";
import { StringObject } from "./objectParser";
export declare function Transpiler(code: string, sendMessage?: boolean, scopeData?: {
    variables?: string[];
    embeds?: EmbedData[];
    name?: string;
    sendFunction?: string;
    functions?: string;
    env?: string[];
    objects?: Record<string, StringObject>;
}, uglify?: boolean): {
    code: string;
    scope: Scope[];
    func: any;
};
//# sourceMappingURL=transpiler.d.ts.map