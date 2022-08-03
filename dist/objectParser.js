"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStringObject = exports.getObjectData = exports.StringObject = exports.ObjectQuoteRegex = void 0;
const stringparser_1 = require("./stringparser");
const util_1 = require("./util");
exports.ObjectQuoteRegex = /".*?"/g;
class StringObject {
    constructor(start, parent) {
        this.parent = parent;
        this.name = Math.random() * 999999;
        this.keys = [];
        this.values = [];
        this.start = start;
        this.end = undefined;
        this.children = [];
    }
    addKey(text) {
        this.keys.push(text);
    }
    addValue(text) {
        this.values.push(text);
    }
    addEnd(text) {
        this.end = text;
    }
    pushChild(child) {
        this.children.push(child);
    }
    solve() {
        if (this.children) {
            this.children.forEach((x) => {
                const res = x.solve();
                const index = this.values.indexOf(`#StringObject_${x.name}#`);
                const keyIndex = this.keys.indexOf(`#StringObject_${x.name}#`);
                this.keys[keyIndex] = res;
                this.values[index] = res;
            });
            const keys = this.keys;
            const values = this.values;
            let i = 0;
            let text = ``;
            if (this.start === "[") {
                text = values.join(",");
                return `${this.start}${text}${this.end}`;
            }
            while (i < keys.length) {
                text += `${keys[i]} : ${values[i]},`;
                i++;
            }
            text = text.slice(0, text.length - 1);
            return `${this.start}${text}${this.end}`;
        }
        else {
            const keys = this.keys;
            const values = this.values;
            let i = 0;
            let text = ``;
            if (this.start === "[") {
                text = values.join(",");
                return `${this.start}${text}${this.end}`;
            }
            while (i < keys.length) {
                text += `${keys[i]} : ${values[i]},`;
                i++;
            }
            text = text.slice(0, text.length - 1);
            return `${this.start}${text}${this.end}`;
        }
    }
}
exports.StringObject = StringObject;
function getObjectData(stringObject, currentObj) {
    let i = 0, text = "";
    while (i < stringObject.length) {
        const char = stringObject[i];
        if (char === "{" || char === "[") {
            const newObj = new StringObject(char, currentObj);
            currentObj.addValue(`#StringObject_${newObj.name}#`);
            currentObj = newObj;
        }
        else if (char === "}" || char === "]") {
            currentObj.addEnd(char);
            if (text.trim() !== "") {
                let t = (0, util_1.parseData)(text.trim());
                if (typeof t === "string") {
                    if (t.trim().startsWith("'") || t.trim().startsWith("\"") || t.trim().startsWith("`")) {
                        t = t.trim().slice(1, t.trim().length - 1);
                        t = (0, stringparser_1.parseString)(t);
                    }
                    else if (t.includes("#FUNCTION_START#")) {
                        if (t
                            .replaceAll(/#FUNCTION_START#(.+?)#FUNCTION_END#/g, "")
                            .trim() !== "") {
                            t = (0, stringparser_1.parseString)(t);
                        }
                    }
                    else
                        t = (0, stringparser_1.parseString)(t);
                }
                currentObj.addValue(t);
                text = "";
            }
            currentObj.parent?.pushChild(currentObj);
            currentObj = currentObj.parent;
        }
        else if (char === ":") {
            currentObj.addKey(text.trim());
            text = "";
        }
        else if (char === ",") {
            if (currentObj.start === "[") {
                let t = (0, util_1.parseData)(text.trim());
                if (typeof t === "string") {
                    if (t.trim().startsWith("'") || t.trim().startsWith("\"") || t.trim().startsWith("`")) {
                        t = t.trim().slice(1, t.trim().length - 1);
                        t = (0, stringparser_1.parseString)(t);
                    }
                    else if (t.includes("#FUNCTION_START#")) {
                        if (t
                            .replaceAll(/#FUNCTION_START#(.+?)#FUNCTION_END#/g, "")
                            .trim() !== "") {
                            t = (0, stringparser_1.parseString)(t);
                        }
                    }
                    else
                        t = (0, stringparser_1.parseString)(t);
                }
                currentObj.addValue(t);
            }
            else {
                let t = (0, util_1.parseData)(text.trim());
                if (typeof t === "string") {
                    if (t.trim().startsWith("'") || t.trim().startsWith("\"") || t.trim().startsWith("`")) {
                        t = t.trim().slice(1, t.trim().length - 1);
                        t = (0, stringparser_1.parseString)(t);
                    }
                    else if (t.includes("#FUNCTION_START#")) {
                        if (t
                            .replaceAll(/#FUNCTION_START#(.+?)#FUNCTION_END#/g, "")
                            .trim() !== "") {
                            t = (0, stringparser_1.parseString)(t);
                        }
                    }
                    else
                        t = (0, stringparser_1.parseString)(t);
                }
                currentObj.addValue(t);
            }
            text = "";
        }
        else {
            text += char;
        }
        i++;
    }
    if (text.trim() !== "") {
        let t = (0, util_1.parseData)(text.trim());
        if (typeof t === "string") {
            if (t.trim().startsWith("'") || t.trim().startsWith("\"") || t.trim().startsWith("`")) {
                t = t.trim().slice(1, t.trim().length - 1);
                t = (0, stringparser_1.parseString)(t);
            }
            else if (t.includes("#FUNCTION_START#")) {
                if (t
                    .replaceAll(/#FUNCTION_START#(.+?)#FUNCTION_END#/g, "")
                    .trim() !== "") {
                    t = (0, stringparser_1.parseString)(t);
                }
            }
            else
                t = (0, stringparser_1.parseString)(t);
        }
        currentObj.addValue(t);
    }
    return currentObj;
}
exports.getObjectData = getObjectData;
function parseStringObject(stringObject, currentObj) {
    const quotes = stringObject.match(exports.ObjectQuoteRegex);
    if (quotes) {
        quotes.forEach((x) => {
            const newx = x
                .replaceAll(":", "#OBJECT_SEPARATER#")
                .replaceAll("{", "#OBJECT_STARTER#")
                .replaceAll("}", "#OBJECT_ENDER#")
                .replaceAll("[", "#ARRAY_STARTER#")
                .replaceAll("]", "#ARRAY_ENDER#")
                .replaceAll(",", "#ARRAY_SEPARATOR#");
            stringObject = stringObject.replace(x, newx);
        });
    }
    return getObjectData(stringObject.slice(1, stringObject.length - 1), currentObj);
}
exports.parseStringObject = parseStringObject;
//# sourceMappingURL=objectParser.js.map