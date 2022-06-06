import { ColorResolvable } from "discord.js";
import { Scope } from "./scope";
import { funcData } from "./typings/interface";
export declare function areBracketsBalanced(code: string): boolean;
export declare function countBrackets(code: string): {
    leftbracketCount: number;
    rightbracketCount: number;
};
export declare function parseData(text: string): any;
export declare function escapeVars(name: string): string;
export declare function escapeResult(res: string): string;
export declare function parseResult(result: string): string;
export declare function removeSetFunc(code: string): string;
export declare function escapeFunctionResult(result: string): string;
export declare function hasFunction(code: string): boolean;
export declare function getFunctionData(code: string, func: string, functions: string[]): funcData;
export declare const functionFinderRegex: RegExp;
export declare function getFunctionList(code: string, functions: string[]): string[];
export declare function ExecuteData(code: string, data: funcData[], scope: Scope[]): {
    code: string;
    scope: Scope[];
};
export declare function _parseString(text: string): string;
export declare function convertToBool(output: string): boolean;
export declare function removeFunction(total: string): string;
export declare function resolveColor(color: ColorResolvable): number;
//# sourceMappingURL=util.d.ts.map