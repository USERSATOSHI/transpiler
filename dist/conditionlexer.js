"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionLexer = exports.areSBracketsBalanced = exports.countSBrackets = exports.Condition = exports.operators = void 0;
const util_1 = require("util");
const stringparser_1 = require("./stringparser");
const util_2 = require("./util");
const opposites = {
    "===": "!==",
    "!==": "===",
    "==": "!=",
    "!=": "==",
    ">": "<=",
    "<": ">=",
    ">=": "<",
    "<=": ">",
};
exports.operators = ["===", "!==", "==", "!=", ">", "<", ">=", "<="];
class Condition {
    condition;
    nest;
    parent;
    constructor(condition, parent) {
        this.condition = condition;
        this.nest = [];
        this.parent = parent ?? null;
    }
    solve(opposite) {
        if (this.nest.length) {
            return this._solve(this.condition, opposite);
        }
        else
            return this.solveAnd(this.condition, opposite);
    }
    solveAnd(condition, opposite) {
        const conditions = condition.split("&&");
        let res = [];
        for (const c of conditions) {
            //console.log({cand:c})
            if (condition.includes("||")) {
                res.push(this.solveOr(c, opposite));
            }
            else {
                res.push(this._solve(c, opposite));
            }
        }
        return res.join("&&");
    }
    solveOr(condition, opposite) {
        const conditions = condition.split("||");
        let res = [];
        for (const c of conditions) {
            //console.log({ cor: c });
            res.push(this._solve(c, opposite));
        }
        return res.join("||");
    }
    _solve(condition, opposite) {
        condition = condition
            .replaceAll("#SMOOTH_BRACKET_LEFT#", "(")
            .replaceAll("#SMOOTH_BRACKET_RIGHT#", ")");
        if (this.nest.length) {
            for (const c of this.nest) {
                const solvedData = c.solve(opposite);
                console.log({ solvedData, c: condition });
                condition = condition.replace("#CONDITION#", `(${solvedData})`);
                console.log({ conditionafter: condition });
            }
            return condition;
        }
        else {
            //console.log({ ogcon: condition });
            const op = exports.operators.find((o) => this.condition.includes(o));
            let res;
            if (op) {
                const [left, right] = condition.split(op);
                console.log({ ofleft: left, ogright: right });
                let leftData, rightData;
                if (left.trim().split(" ").length === 1) {
                    leftData = (0, util_2.parseData)(left.trim());
                    console.log({ trueleftData: leftData });
                    if (typeof leftData === "object") {
                        try {
                            leftData = JSON.stringify(leftData);
                        }
                        catch {
                            leftData = (0, util_1.inspect)(leftData);
                        }
                    }
                    else if (typeof leftData === "string") {
                        if ((leftData.startsWith("#FUNCTION_START#") &&
                            leftData.endsWith("#FUNCTION_END#")) ||
                            leftData.startsWith("__$DISCORD_DATA$__")) {
                            leftData = leftData;
                        }
                        else {
                            leftData = (0, stringparser_1.parseString)(leftData);
                            console.log({ left: leftData });
                            if (typeof (0, util_2.parseData)(leftData.substring(1, leftData.length - 1)) !==
                                "string") {
                                leftData = (0, util_2.parseData)(leftData.substring(1, leftData.length - 1));
                                console.log({ leftData });
                            }
                        }
                    }
                }
                else {
                    leftData = (0, stringparser_1.parseString)(left.trim());
                }
                //console.log({ rl: right.trim().split(" ").length });
                if (right.trim().split(" ").length === 1) {
                    rightData = (0, util_2.parseData)(right.trim());
                    console.log({ truerightData: rightData });
                    if (typeof rightData === "object") {
                        try {
                            rightData = JSON.stringify(rightData);
                        }
                        catch {
                            rightData = (0, util_1.inspect)(rightData);
                        }
                    }
                    else if (typeof rightData === "string") {
                        if ((rightData.startsWith("#FUNCTION_START#") &&
                            rightData.endsWith("#FUNCTION_END#")) ||
                            (rightData.startsWith("__$") && rightData.includes("$__")) ||
                            rightData.startsWith("__$DISCORD_DATA$__")) {
                            rightData = rightData;
                        }
                        else {
                            rightData = (0, stringparser_1.parseString)(rightData);
                            if (typeof (0, util_2.parseData)(rightData.substring(1, rightData.length - 1)) !== "string") {
                                rightData = (0, util_2.parseData)(rightData.substring(1, rightData.length - 1));
                                console.log({ rightData });
                            }
                        }
                    }
                    res = opposite
                        ? `${leftData}${opposites[op]}${rightData}`
                        : `${leftData}${op}${rightData}`;
                    // //console.log({
                    //   res,
                    //   c: condition,
                    //   leftData,
                    //   rightData,
                    //   op,
                    // });
                }
                else {
                    rightData = (0, stringparser_1.parseString)(right.trim());
                    res = opposite
                        ? `${leftData}${opposites[op]}${rightData}`
                        : `${leftData}${op}${rightData}`;
                }
            }
            else {
                res = (0, util_2.parseData)(condition);
                if (typeof res === "string" &&
                    (!res.endsWith("#FUNCTION_END#") ||
                        res.trim().split(" ").length > 1) &&
                    !res.startsWith("#FUNCTION_START#")) {
                    res = (0, stringparser_1.parseString)(res);
                }
                //console.log({ res, c: condition });
            }
            return res;
        }
    }
    add(part) {
        this.condition += part;
    }
}
exports.Condition = Condition;
function countSBrackets(condition) {
    const sBrackets = condition.match(/\(/g);
    const eBrackets = condition.match(/\)/g);
    return {
        right: sBrackets ? sBrackets.length : 0,
        left: eBrackets ? eBrackets.length : 0,
    };
}
exports.countSBrackets = countSBrackets;
function areSBracketsBalanced(condition) {
    const { left, right } = countSBrackets(condition);
    return left === right;
}
exports.areSBracketsBalanced = areSBracketsBalanced;
function conditionLexer(condition) {
    let tempCondition;
    if (condition.includes("#FUNCTION_START#")) {
        const matches = condition.match(/((#FUNCTION_START#([$a-z.0-9\s?(){}\[\]._:'"`;=><,!-]|\n)+#FUNCTION_END#)|(__\$[a-z_?.()]+\$__))/gim);
        if (matches) {
            for (let match of matches) {
                const newmatch = match
                    .replaceAll("(", "#SMOOTH_BRACKET_LEFT#")
                    .replaceAll(")", "#SMOOTH_BRACKET_RIGHT#");
                condition = condition.replace(match, newmatch);
            }
            tempCondition = condition;
        }
        tempCondition = condition;
    }
    else {
        tempCondition = condition;
    }
    const counts = countSBrackets(tempCondition);
    //console.log(counts);
    let i = 0;
    let starter = new Condition("");
    while (i < tempCondition.length) {
        if (tempCondition[i] === "(") {
            const nest = new Condition("", starter);
            starter.add("#CONDITION#");
            //console.log({ con: starter.condition });
            starter.nest.push(nest);
            starter = nest;
        }
        else if (tempCondition[i] === ")") {
            ////console.log(starter)
            if (starter.parent)
                starter = starter.parent;
            else
                break;
        }
        else {
            starter.add(tempCondition[i]);
        }
        i++;
    }
    return starter;
}
exports.conditionLexer = conditionLexer;
//# sourceMappingURL=conditionlexer.js.map