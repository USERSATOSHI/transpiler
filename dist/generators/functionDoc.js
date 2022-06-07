"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docGen = void 0;
const functions_1 = require("../functions");
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const showdown_1 = require("showdown");
const convert = new showdown_1.Converter();
convert.setFlavor("github");
convert.setOption('table', true);
async function docGen() {
    (0, fs_1.mkdirSync)("./docs/functions");
    for (const func of Object.values(functions_1.datas)) {
        const format = `# ${func.name}
${func.description}

${func.fields.length
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
            : ""}

## Usage
\`\`\`php
${func.name}${func.fields.length
            ? `[${func.fields.map((x) => x.required ? `${x.name}` : `${x.name}?`)}]`
            : ""}
\`\`\`
## Returns
${func.returns}
## Default
${func.default
            .map((x, y) => x === "void"
            ? func.fields[y].name + ": required"
            : func.fields[y].name + ": " + x)
            .join("\n")}
`;
        const htmlfile = convert.makeHtml(format);
        await (0, promises_1.writeFile)(`./docs/functions/${func.name}.html`, htmlfile);
    }
}
exports.docGen = docGen;
docGen();
//# sourceMappingURL=functionDoc.js.map