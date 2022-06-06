export declare class Block {
    position: number;
    isMain: boolean;
    parent?: Block;
    nest: Block[];
    text: string;
    constructor(position: number, isMain: boolean, parent?: Block);
    add(text: string): void;
    addBlock(block: Block): void;
    parse(): string;
    get parsed(): string;
}
export declare function createStringAST(text: string): Block;
export declare function parseString(text: string): string;
//# sourceMappingURL=stringparser.d.ts.map