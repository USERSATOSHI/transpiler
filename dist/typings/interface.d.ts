import { Scope } from "../scope";
export declare type CommandTypes = "basicCommand" | "slashCommand";
export interface FunctionData {
    name: string;
    brackets: boolean;
    optional: boolean;
    type: "scope" | "setter" | "getter" | "function" | "function_getter" | "scope_getter";
    fields: {
        name: string;
        type: string;
        required: boolean;
    }[];
    code: (data: funcData, scope: Scope[]) => {
        code: string;
        scope: Scope[];
        data?: funcData;
    };
}
export interface PartialFunctionData extends FunctionData {
    total: string;
}
export interface funcData extends FunctionData {
    inside?: string;
    parent?: FunctionData;
    total: string;
    splits: string[];
    funcs: funcData[];
    parsed: string;
}
export interface CommandData {
    name: string;
    type: CommandTypes;
    code: string;
    __compiled__?: string;
    __uglify__: boolean;
    aliases?: string[];
    __path__?: string;
}
//# sourceMappingURL=interface.d.ts.map