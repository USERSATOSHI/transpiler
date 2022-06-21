"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveColor = exports.removeFunction = exports.convertToBool = exports._parseString = exports.ExecuteData = exports.getFunctionList = exports.functionFinderRegex = exports.getFunctionData = exports.hasFunction = exports.escapeFunctionResult = exports.removeSetFunc = exports.parseResult = exports.escapeResult = exports.escapeVars = exports.parseData = exports.countBrackets = exports.areBracketsBalanced = void 0;
const discord_js_1 = require("discord.js");
const error_1 = require("./error");
const index_1 = require("./functions/index");
function areBracketsBalanced(code) {
    const leftbracket = /\[/g;
    const rightbracket = /\]/g;
    const leftbracketCount = code.match(leftbracket)?.length ?? 0;
    const rightbracketCount = code.match(rightbracket)?.length ?? 0;
    return leftbracketCount === rightbracketCount;
}
exports.areBracketsBalanced = areBracketsBalanced;
function countBrackets(code) {
    const leftbracket = /\[/g;
    const rightbracket = /\]/g;
    const leftbracketCount = code.match(leftbracket)?.length ?? 0;
    const rightbracketCount = code.match(rightbracket)?.length ?? 0;
    return { leftbracketCount, rightbracketCount };
}
exports.countBrackets = countBrackets;
function parseData(text) {
    if (text === "")
        return text;
    else if (!isNaN(Number(text)) && Number.isSafeInteger(Number(text)))
        return Number(text);
    else if (!isNaN(Number(text)) && !Number.isSafeInteger(text))
        return text;
    else if (text === "null")
        return null;
    else if (text === "undefined")
        return undefined;
    else if (text === "true" || text === "false")
        return text === "true";
    else {
        try {
            return JSON.parse(text);
        }
        catch {
            return text;
        }
    }
}
exports.parseData = parseData;
function escapeVars(name) {
    return `__$${name}$__`;
}
exports.escapeVars = escapeVars;
function escapeResult(res) {
    return `#FUNCTION_START#${res}#FUNCTION_END#`;
}
exports.escapeResult = escapeResult;
function parseResult(result) {
    return result
        .replaceAll("#FUNCTION_START#", "")
        .replaceAll("#FUNCTION_END#", "")
        .replaceAll("#FUNCTION_SEPARATOR#", ";")
        .replaceAll("#FUNCTION_FUNCTION#", "")
        .replaceAll("#FUNCTION_SETTER#", "")
        .replaceAll("#FUNCTION_GETTER", "")
        .replaceAll("#FUNCTION_INSIDE_SCOPE_START#", "")
        .replaceAll("#FUNCTION_INSIDE_SCOPE_END#", "")
        .replaceAll("#FUNCTION_SCOPE_START#", "")
        .replaceAll("#FUNCTION_SCOPE_END#", "")
        .replaceAll("#FUNCTION_FUNCTION_START#", "")
        .replaceAll("#FUNCTION_FUNCTION_END#", "");
}
exports.parseResult = parseResult;
function removeSetFunc(code) {
    return code
        .replaceAll("#FUNCTION_SETTER#", "")
        .replaceAll("#FUNCTION_FUNCTION#", "");
}
exports.removeSetFunc = removeSetFunc;
function escapeFunctionResult(result) {
    return `#FUNCTION_FUNCTION_START##FUNCTION_START#${result}#FUNCTION_END##FUNCTION_FUNCTION_END#`;
}
exports.escapeFunctionResult = escapeFunctionResult;
function hasFunction(code) {
    return exports.functionFinderRegex.test(code);
}
exports.hasFunction = hasFunction;
function getFunctionData(code, func, functions) {
    //console.log({ getfuncdatatopcode: code });
    const FuncD = index_1.datas[func];
    const reg = new RegExp(`${func.replace("$", "\\$")}`, "i");
    code = code.replace(reg, func);
    code = code.replaceAll("`", "#STRING_LITERAL#");
    //console.log({ getfuncdatacodebef: code });
    const functionPosition = code.indexOf(func);
    code = code.substring(functionPosition, code.length);
    //console.log({ getfuncdatacodeaft: code });
    let leftCount = 0, rightCount = 0, i = 0;
    let rawTotal = "";
    while (true) {
        if (!FuncD?.brackets && !code.slice(func.length).startsWith("[")) {
            break;
        }
        if (!FuncD?.optional && !code.slice(func.length).startsWith("[")) {
            throw new error_1.TranspilerError(`${func}: Required Brackets`);
        }
        if (areBracketsBalanced(code) && countBrackets(code).leftbracketCount === 0)
            break;
        if (rightCount === leftCount && rightCount !== 0)
            break;
        if (!areBracketsBalanced(code)) {
            throw new error_1.TranspilerError("Brackets are not balanced in code:\n\n" + code);
        }
        if (code.slice(func.length)[0] !== "[") {
            //console.log({ slicedcode: code.slice(func.length) });
            break;
        }
        if (code[i] === "[")
            leftCount++;
        else if (code[i] === "]")
            rightCount++;
        rawTotal += code[i];
        i++;
    }
    if (rawTotal === "")
        rawTotal = func;
    let funcs = [];
    let inside = rawTotal.endsWith("]") && rawTotal.startsWith(`${func}[`)
        ? rawTotal.substring(func.length + 1, rawTotal.length - 1)
        : undefined;
    //console.log({ rawTotal, inside });
    const list = getFunctionList(inside || "", functions);
    functions.splice(0, list.length);
    //console.log({ inbef: inside });
    let newinside = inside || "";
    while (list.length) {
        const func = list.shift() || "";
        const funcData = getFunctionData(newinside, func, list);
        //console.log({ iind: inside, newinsided: newinside });
        inside = inside?.replace(funcData.inside?.replaceAll("#FUNCTION_SEPARATOR#", ";") ?? "", funcData.parsed);
        newinside = newinside.replace(funcData.total, "#FUNCTION#");
        //console.log({
        //   indur: inside,
        //   newinsidedur: newinside,
        //   total: funcData.total,
        // });
        funcs.push(funcData);
    }
    const splits = inside?.split(";") || [];
    const parsed = inside?.replaceAll(";", "#FUNCTION_SEPARATOR#");
    //console.log({ func, parsed, inside });
    return {
        inside,
        total: rawTotal,
        splits,
        funcs,
        parsed: parsed ?? "",
        ...FuncD,
    };
}
exports.getFunctionData = getFunctionData;
exports.functionFinderRegex = /(\$[a-z]*)/gi;
function getFunctionList(code, functions) {
    const raws = code.match(exports.functionFinderRegex);
    if (!raws)
        return [];
    const functions_that_exists = functions.filter((x) => code.toLowerCase().includes(x.toLowerCase()));
    let res = [];
    for (const raw of raws) {
        let func = functions_that_exists.filter((x) => x.toLowerCase() === raw.toLowerCase().slice(0, x.length));
        if (func.length === 1)
            res.push(func[0]);
        else if (func.length > 1) {
            res.push(func.sort((a, b) => b.length - a.length)[0]);
        }
        else {
            continue;
        }
    }
    return res;
}
exports.getFunctionList = getFunctionList;
function ExecuteData(code, data, scope) {
    let i = 0;
    ////console.log({data})
    while (i < data.length) {
        let d = data[i];
        console.log({ og: scope[scope.length - 1] });
        const oldd = data[i].total;
        if (d.type === "scope" || d.type === "scope_getter") {
            console.log("executing scope function : " + d.name);
            const result = d.code(d, scope);
            scope = result.scope;
            d = result.data;
            console.log({ res: result.code, dt: d.total });
            code = code
                .replace(d.total, result.code);
            // .replace(d.total.replaceAll(";", "#FUNCTION_SEPARATOR#"), result.code);
            if (d.type === "scope_getter") {
                //console.log({ contentbef: scope[scope.length - 1].sendData.content });
                d.total = removeFunction(d.total);
                scope[scope.length - 1].sendData.content = scope[scope.length - 1].sendData.content.replace(d.total, result.code);
                //console.log({ contentaft: scope[scope.length - 1].sendData.content });
            }
        }
        else {
            let executed;
            //console.log({ d });
            if (d.funcs.length) {
                //console.log({ code });
                executed = ExecuteData(parseResult(d.inside ?? ""), d.funcs, scope);
                scope = executed.scope;
                //console.log({ insideprev: d.inside });
                const oldtotal = d.total;
                console.log({ oldtot: d.total, in: d.inside });
                d.total = d.total
                    .replace(d.inside ?? "", executed.code)
                    .replace(d.inside?.replaceAll("#FUNCTION_SEPARATOR#", ";") ?? "", executed.code);
                //console.log({ newtot: d.total });
                //console.log({ oldcode: code });
                code = code
                    .replace(oldtotal, d.total)
                    .replace(oldd, d.total);
                //console.log({ newcode: code });
                d.inside = executed.code;
                d.splits = d.inside.split(";");
                //console.log({ insideafter: d.inside });
                //console.log("executing: " + d.total);
                console.log("executing function : " + d.name);
                console.log({ restbef: scope[scope.length
                        - 1].rest });
                const result = d.code(d, scope);
                console.log({ restbef: scope[scope.length - 1].rest });
                console.log({ result: result.code, dt: d.total, code });
                //console.log({ funccodebef: code });
                code = code
                    .replace(d.total, result.code)
                    // .replace(d.total.replaceAll(";", "#FUNCTION_SEPARATOR#"), result.code)
                    .replace(oldd, result.code);
                console.log({ codeafter: code });
                if (d.type === "getter" || d.type === "function_getter") {
                    scope[scope.length - 1].sendData.content = scope[scope.length - 1].sendData.content
                        .replace(d.total, result.code)
                        .replace(d.total.replaceAll(";", "#FUNCTION_SEPARATOR#"), result.code)
                        .replace(oldd, result.code);
                }
                // console.log({
                //   oldd: oldd,
                //   rawt: d.total,
                //   parset: d.total.replaceAll(";", "#FUNCTION_SEPARATOR#"),
                // });
                // console.log({ funccodeaft: code });
                // console.log({ funcres: result });
            }
            else {
                console.log("executing function : " + d.name);
                //console.log("executing: " + d.total);
                executed = d.code(d, scope);
                scope = executed.scope;
                // console.log({ executed });
                // console.log({ codebef: code });
                console.log({
                    total: d.total,
                    excode: executed.code,
                    code,
                });
                code = code
                    .replace(d.total, executed.code);
                // .replace(
                //   d.total.replaceAll(";", "#FUNCTION_SEPARATOR#"),
                //   executed.code,
                // );
                console.log({ codeafter: code });
                console.log({ d });
                if (d.type === "getter" || d.type === "function_getter") {
                    //console.log({ contentbef: scope[scope.length - 1].sendData.content });
                    d.total = removeFunction(d.total);
                    scope[scope.length - 1].sendData.content = scope[scope.length - 1].sendData.content.replace(d.total, executed.code);
                    //console.log({ contentaft: scope[scope.length - 1].sendData.content });
                }
                //console.log({ codeaft: code });
            }
        }
        if (d.type !== "getter" &&
            d.type !== "function_getter" &&
            d.type !== "scope_getter") {
            const s = scope[scope.length - 1];
            d.total = removeFunction(d.total);
            console.log({ dt: d.total, c: s.sendData.content });
            s.sendData.content = s.sendData.content.replace(d.total, "");
            scope[scope.length - 1] = s;
            console.log({ s: scope[0], content: scope[0].sendData.content });
        }
        // if (d.type === "scope") {
        //   const pop = scope.pop();
        //   if (pop) {
        //     console.log({
        //       pop,
        //       scope: scope[scope.length - 1].name,
        //       rest: scope[scope.length - 1].rest,
        //     });
        //     console.log({
        //       popex: pop.toExecuteString(),
        //       matchescode: code.match(
        //         /#FUNCTION_SCOPE_INSIDE_START#(.|\n)+#FUNCTION_SCOPE_INSIDE_END#/g,
        //     ),
        //     matchescope:scope[scope.length - 1].rest.match(/#FUNCTION_SCOPE_INSIDE_START#(.|\n)+#FUNCTION_SCOPE_INSIDE_END#/g),
        //     });
        //     code = code.replace(
        //       /#FUNCTION_SCOPE_INSIDE_START#(.|\n)+#FUNCTION_SCOPE_INSIDE_END#/,
        //       pop.toExecuteString(),
        //     );
        //     scope[scope.length - 1].rest = scope[scope.length - 1].rest.replace(
        //       /#FUNCTION_SCOPE_INSIDE_START#(.|\n)+#FUNCTION_SCOPE_INSIDE_END#/,
        //       pop.toExecuteString(),
        //     );
        //     console.log({
        //       codeafterscopeend: code,
        //       scoperestafterscopeend: scope[scope.length - 1].rest,
        //     });
        //   } else {
        //     console.log({
        //       pop,
        //       scope: scope[scope.length - 1].name,
        //       rest: scope[scope.length - 1].rest,
        //     });
        //     code = code.replace(
        //       /#FUNCTION_SCOPE_INSIDE_START#(.|\n)+#FUNCTION_SCOPE_INSIDE_END#/,
        //       "",
        //     );
        //     scope[scope.length - 1].rest = scope[scope.length - 1].rest.replace(
        //       /#FUNCTION_SCOPE_INSIDE_START#(.|\n)+#FUNCTION_SCOPE_INSIDE_END#/,
        //       "",
        //     );
        //     console.log({
        //       codeafterscopeend: code,
        //       scoperestafterscopeend: scope[scope.length - 1].rest,
        //     });
        //   }
        // }
        i++;
    }
    return {
        code,
        scope,
    };
}
exports.ExecuteData = ExecuteData;
function _parseString(text) {
    const reg = /((#FUNCTION_START#([\s$a-z.0-9?(){}\[\]._:'"`;=><,!-]|\n)+#FUNCTION_END#)|(__\$[a-z_?.()]+\$__))/gim;
    let matches = text.match(reg);
    const functionlist = matches?.slice(1) ?? [];
    functionlist;
    //console.log({ text });
    let temptext = text;
    //console.log({ matches });
    if (matches) {
        matches = matches.reverse();
        let i = 0;
        let u = 0;
        while (i < (matches?.length ?? 0)) {
            const match = matches[i];
            const position = temptext.indexOf(match);
            const part = temptext.slice(position, position + match.length);
            const temppart = parseResult(part);
            console.log({ part, temptext, text });
            console.log({
                oldmatch: match,
                start: text.slice(0, position),
                part: part,
                temppart,
                position,
                partLength: part.length,
                textLength: text.length,
                end: text.slice(position + part.length, text.length),
            });
            temptext = `${temptext.slice(0, position)}${`__$${u
                .toString()
                .repeat(temppart.length - 3)}$__`}${temptext.slice(position + part.length, text.length)}`;
            text = `${text.slice(0, position)}\${${temppart}}${text.slice(position + part.length, text.length)}`;
            console.log({
                temptext,
                text,
            });
            matches = temptext.match(reg)?.reverse() ?? [];
            console.log({ newmatch: matches });
            i = 0;
            u++;
        }
        matches = text.match(/__\$[0-9]+\$__/gi)?.reverse() ?? [];
        console.log(matches);
        matches.forEach((x, y) => {
            text = text.replace(x, `\${${parseResult(functionlist[y])}}`);
        });
        console.log(text);
        text = `\`${text}\``;
    }
    else {
        text = `\`${text}\``;
    }
    return text;
}
exports._parseString = _parseString;
// export function parseString(text: string) {
//   const matches = text.match(
//     /((#FUNCTION_START#([\s$a-z.0-9?(){}\[\]._:'"`;=><,!-]|\n)+#FUNCTION_END#)|(__\$[a-z_?.()]+\$__))/gim,
//   );
//   console.log({ text });
//   let temptext = text;
//   console.log({ matches });
//   if (matches) {
//     for (const match of matches) {
//       const position = temptext.indexOf(match);
//       const part = temptext.slice(position, position + match.length);
//       console.log({ part, temptext, text });
//       temptext = `${temptext.slice(0, position)}${"#".repeat(
//         part.length + 3,
//       )}${temptext.slice(position + part.length, text.length)}`;
//       text = `${text.slice(0, position)}\${${part}}${text.slice(
//         position + part.length,
//         text.length,
//       )}`;
//     }
//     text = `\`${text}\``;
//   } else {
//     text = `\`${text}\``;
//   }
//   return text;
// }
function convertToBool(output) {
    return output === "true" || output === "yes" ? true : false;
}
exports.convertToBool = convertToBool;
function removeFunction(total) {
    if (!total.includes("#FUNCTION_FUNCTION_START#"))
        return total;
    const parts = total.split("#FUNCTION_FUNCTION_START#").slice(1);
    let i = 0;
    while (i < parts.length) {
        const part = parts[i].split("#FUNCTION_FUNCTION_END#")[0];
        console.log({ part });
        total = total.replace(part, "");
        i++;
    }
    return parseResult(total);
}
exports.removeFunction = removeFunction;
function resolveColor(color) {
    let resolvedColor;
    if (typeof color === "string") {
        if (color.toLowerCase() === "random") {
            resolvedColor = color.toLowerCase();
            resolvedColor =
                resolvedColor.slice(0, 1).toUpperCase() + resolvedColor.slice(1);
        }
        else
            resolvedColor = color;
    }
    else {
        resolvedColor = color;
    }
    try {
        return discord_js_1.Util.resolveColor(resolvedColor);
    }
    catch (e) {
        console.error(e);
        return 0;
    }
}
exports.resolveColor = resolveColor;
// //console.log( getFunctionData(`$execute[$let[hi;1] $let[ok;$get[hi]]]`, "$execute", [
//        "$get",
//        "$let",
//      ]).funcs)
//# sourceMappingURL=util.js.map