export declare const ObjectQuoteRegex: RegExp;
export declare class StringObject {
    parent: StringObject | undefined;
    children: StringObject[];
    start: "{" | "[";
    end?: "}" | "]";
    keys: string[];
    values: string[];
    name: number;
    constructor(start: "{" | "[", parent?: StringObject);
    addKey(text: string): void;
    addValue(text: string): void;
    addEnd(text: "}" | "]"): void;
    pushChild(child: StringObject): void;
    solve(): string;
}
export declare function getObjectData(stringObject: string, currentObj: StringObject): StringObject;
export declare function parseStringObject(stringObject: string, currentObj: StringObject): StringObject;
//# sourceMappingURL=objectParser.d.ts.map