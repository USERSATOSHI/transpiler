export class Block {
  position: number;
  isMain: boolean;
  parent?: Block;
  nest: Block[];
  text: string;
  constructor(position: number, isMain: boolean, parent?: Block) {
    this.position = position;
    this.isMain = isMain;
    this.parent = parent;
    this.nest = [];
    this.text = "";
  }
  add(text: string) {
    this.text += text;
  }
  addBlock(block: Block) {
    this.nest.push(block);
  }
  parse() {
    if (this.nest.length) {
      for (const block of this.nest) {
        const res = block.parse();
        this.text = this.text.replace(block.parsed, res);
      }
      return this.isMain ? `\`${this.text}\`` : `\${${this.text}}`;
    } else {
      return this.isMain ? `\`${this.text}\`` : `\${${this.text}}`;
    }
  }
  get parsed() {
    return `#NEST_POSITION_${this.position}#`;
  }
}

export function createStringAST(text: string) {
  let block = new Block(-1, true);
  let i = 0;
  let res = "";
  const stack: number[] = [];
  while (i <= text.length) {
    if (res.includes("#FUNCTION_START#")) {
      stack.push(i - 15);
      res = text[i];
    } else if (res.includes("#FUNCTION_END#")) {
      const a = stack.pop();
      if(!a) {
        stack.push(i-13);
      }
      res = text[i];
    } else {
      res += text[i];
    }
    i++;
  }
  if (stack.length) {
    stack
    stack.forEach((x) => {
      text = text.substring(0, x - 1) + text.slice(x + 15, text.length);
    });
  }
  i = 0;
  res = "";
  console.log({ textafter: text });
  while (i <= text.length) {
    if (res.includes("#FUNCTION_START#")) {
      const nest = new Block(block.nest.length, false, block);
      block.text = block.text.replace("#FUNCTION_START#", "");
      block.add(`#NEST_POSITION_${block.nest.length}#`);
      block.addBlock(nest);
      block = nest;
      block.add(text[i]);
      res = "";
    } else if (res.includes("#FUNCTION_END#")) {
      block.text = block.text.replace("#FUNCTION_END#", "");
      block = block.parent ? block.parent : block;
      block.add(text[i] ?? "");
      res = "";
    } else {
      res += text[i];
      block.add(text[i] ?? "");
    }
    i++;
  }
  return block;
}

export function parseString(text: string) {
  const ast = createStringAST(text);
  return ast.parse();
}

console.log(createStringAST('#FUNCTION_START#__$DISCORD_DATA$__.client.ws.ping#FUNCTION_END#').parse());

console.log("$hi$".replace("$hi$", "hello"));
