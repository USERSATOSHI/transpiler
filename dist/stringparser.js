"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseString = exports.createStringAST = exports.Block = void 0;
class Block {
    position;
    isMain;
    parent;
    nest;
    text;
    constructor(position, isMain, parent) {
        this.position = position;
        this.isMain = isMain;
        this.parent = parent;
        this.nest = [];
        this.text = "";
    }
    add(text) {
        this.text += text;
    }
    addBlock(block) {
        this.nest.push(block);
    }
    parse() {
        if (this.nest.length) {
            for (const block of this.nest) {
                const res = block.parse();
                this.text = this.text.replace(block.parsed, res);
            }
            return this.isMain ? `\`${this.text}\`` : `\${${this.text}}`;
        }
        else {
            return this.isMain ? `\`${this.text}\`` : `\${${this.text}}`;
        }
    }
    get parsed() {
        return `#NEST_POSITION_${this.position}#`;
    }
}
exports.Block = Block;
function createStringAST(text) {
    let block = new Block(-1, true);
    let i = 0;
    let res = "";
    const stack = [];
    while (i <= text.length) {
        if (res.includes("#FUNCTION_START#")) {
            stack.push(i - 15);
            res = text[i];
        }
        else if (res.includes("#FUNCTION_END#")) {
            const a = stack.pop();
            if (!a) {
                stack.push(i - 13);
            }
            res = text[i];
        }
        else {
            res += text[i];
        }
        i++;
    }
    if (stack.length) {
        stack;
        stack.forEach((x) => {
            text = text.substring(0, x - 1) + text.slice(x + 15, text.length);
        });
    }
    i = 0;
    res = "";
    while (i <= text.length) {
        if (res.includes("#FUNCTION_START#")) {
            const nest = new Block(block.nest.length, false, block);
            block.text = block.text.replace("#FUNCTION_START#", "");
            block.add(`#NEST_POSITION_${block.nest.length}#`);
            block.addBlock(nest);
            block = nest;
            block.add(text[i]);
            res = "";
        }
        else if (res.includes("#FUNCTION_END#")) {
            block.text = block.text.replace("#FUNCTION_END#", "");
            block = block.parent ? block.parent : block;
            block.add(text[i] ?? "");
            res = "";
        }
        else {
            res += text[i];
            block.add(text[i] ?? "");
        }
        i++;
    }
    return block;
}
exports.createStringAST = createStringAST;
function parseString(text) {
    const ast = createStringAST(text);
    return ast.parse();
}
exports.parseString = parseString;
//# sourceMappingURL=stringparser.js.map