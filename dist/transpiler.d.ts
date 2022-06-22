import { Scope } from "./scope";
import { EmbedData } from "discord.js";
export declare function Transpiler(code: string, sendMessage?: boolean, scopeData?: {
    variables?: string[];
    embeds?: EmbedData[];
    name?: string;
    sendFunction?: string;
    env?: string[];
}, uglify?: boolean): {
    code: string;
    scope: Scope[];
    func: any;
};
//# sourceMappingURL=transpiler.d.ts.map