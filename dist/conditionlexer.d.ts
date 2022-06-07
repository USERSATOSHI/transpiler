export declare const operators: string[];
export declare class Condition {
    condition: string;
    nest: Condition[];
    parent: Condition | null;
    constructor(condition: string, parent?: Condition);
    solve(opposite: boolean): string;
    solveAnd(condition: string, opposite: boolean): string;
    solveOr(condition: string, opposite: boolean): string;
    _solve(condition: string, opposite: boolean): string;
    add(part: string): void;
}
export declare function countSBrackets(condition: string): {
    right: number;
    left: number;
};
export declare function areSBracketsBalanced(condition: string): boolean;
export declare function conditionLexer(condition: string): Condition;
//# sourceMappingURL=conditionlexer.d.ts.map