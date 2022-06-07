import { datas as funcs } from "../functions";
import { writeFile } from "fs/promises";
import { mkdirSync } from "fs";
import { Converter } from "showdown";
const convert = new Converter();
convert.setFlavor("github");
convert.setOption('table', true)
export async function docGen() {
  mkdirSync("./docs/functions");
  for (const func of Object.values(funcs)) {
    const format = `# ${func.name}
${func.description}

${
  func.fields.length
    ? `## Parameters
|Name |Type |Required|
|-----|-----|--------|
${func.fields
  .map((x) => {
    `|${x.name}|${x.type}|${x.required}|`;
  })
  .join("\n")}
|-----|-----|--------|
`
    : ""
}

## Usage
\`\`\`php
${func.name}${
      func.fields.length
        ? `[${func.fields.map((x) =>
            x.required ? `${x.name}` : `${x.name}?`,
          )}]`
        : ""
    }
\`\`\`
## Returns
${func.returns}
## Default
${func.default
  .map((x, y) =>
    x === "void"
      ? func.fields[y].name + ": required"
      : func.fields[y].name + ": " + x,
  )
  .join("\n")}
`;
    const htmlfile = convert.makeHtml(format);
    await writeFile(`./docs/functions/${func.name}.html`, htmlfile);
  }
}

docGen();
