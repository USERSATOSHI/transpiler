import { inspect } from "util";
import { parseString } from "./stringparser";
import { parseData } from "./util";
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
export const operators = ["===", "!==", "==", "!=", ">", "<", ">=", "<="];
export class Condition {
  condition: string;
  nest: Condition[];
  parent: Condition | null;
  constructor(condition: string, parent?: Condition) {
    this.condition = condition;
    this.nest = [];
    this.parent = parent ?? null;
  }
  solve(opposite: boolean) {
    if (this.nest.length) {
      return this._solve(this.condition, opposite);
    } else return this.solveAnd(this.condition, opposite);
  }
  solveAnd(condition: string, opposite: boolean) {
    const conditions = condition.split("&&");
    let res = [];
    for (const c of conditions) {
      if (condition.includes("||")) {
        res.push(this.solveOr(c, opposite));
      } else {
        res.push(this._solve(c, opposite));
      }
    }
    return res.join("&&");
  }
  solveOr(condition: string, opposite: boolean) {
    const conditions = condition.split("||");
    let res = [];
    for (const c of conditions) {
      res.push(this._solve(c, opposite));
    }
    return res.join("||");
  }
  _solve(condition: string, opposite: boolean): string {
    condition = condition
      .replaceAll("#SMOOTH_BRACKET_LEFT#", "(")
      .replaceAll("#SMOOTH_BRACKET_RIGHT#", ")");
    if (this.nest.length) {
      for (const c of this.nest) {
        const solvedData = c.solve(opposite);
        condition = condition.replace("#CONDITION#", `(${solvedData})`);
      }
      return condition;
    } else {
      const op = operators.find((o) => condition.includes(o));
      let res;
      if (op) {
        const [left, right] = condition.split(op);
        let leftData, rightData;
        if (left.trim().split(" ").length === 1) {
          leftData = parseData(left.trim());
          if (typeof leftData === "object") {
            try {
              leftData = JSON.stringify(leftData);
            } catch {
              leftData = inspect(leftData);
            }
          } else if (typeof leftData === "string") {
            if (
              (leftData.startsWith("#FUNCTION_START#") &&
                leftData.endsWith("#FUNCTION_END#")) ||
              leftData.startsWith("__$DISCORD_DATA$__")
            ) {
              leftData = leftData;
            } else {
              leftData = parseString(leftData);
              if (
                typeof parseData(leftData.substring(1, leftData.length - 1)) !==
                "string"
              ) {
                leftData = parseData(
                  leftData.substring(1, leftData.length - 1),
                );
              }
            }
          }
        } else {
          leftData = parseString(left.trim());
        }
        if (right.trim().split(" ").length === 1) {
          rightData = parseData(right.trim());
          if (typeof rightData === "object") {
            try {
              rightData = JSON.stringify(rightData);
            } catch {
              rightData = inspect(rightData);
            }
          } else if (typeof rightData === "string") {
            if (
              (rightData.startsWith("#FUNCTION_START#") &&
                rightData.endsWith("#FUNCTION_END#")) ||
              (rightData.startsWith("__$") && rightData.includes("$__")) ||
              rightData.startsWith("__$DISCORD_DATA$__")
            ) {
              rightData = rightData;
            } else {
              rightData = parseString(rightData);
              if (
                typeof parseData(
                  rightData.substring(1, rightData.length - 1),
                ) !== "string"
              ) {
                rightData = parseData(
                  rightData.substring(1, rightData.length - 1),
                );
              }
            }
          }
          res = opposite
            ? `${leftData}${
                opposites[
                  <"==" | "!=" | ">" | "<" | ">=" | "<=" | "===" | "!==">op
                ]
              }${rightData}`
            : `${leftData}${op}${rightData}`;
        } else {
          rightData = parseString(right.trim());
          res = opposite
            ? `${leftData}${
                opposites[
                  <"==" | "!=" | ">" | "<" | ">=" | "<=" | "===" | "!==">op
                ]
              }${rightData}`
            : `${leftData}${op}${rightData}`;
        }
      } else {
        res = parseData(condition);
        if (
          typeof res === "string" &&
          (!res.endsWith("#FUNCTION_END#") ||
            res.trim().split(" ").length > 1) &&
          !res.startsWith("#FUNCTION_START#")
        ) {
          res = parseString(res);
        }
      }

      return res;
    }
  }
  add(part: string) {
    this.condition += part;
  }
}
export function countSBrackets(condition: string) {
  const sBrackets = condition.match(/\(/g);
  const eBrackets = condition.match(/\)/g);
  return {
    right: sBrackets ? sBrackets.length : 0,
    left: eBrackets ? eBrackets.length : 0,
  };
}
export function areSBracketsBalanced(condition: string) {
  const { left, right } = countSBrackets(condition);
  return left === right;
}
export function conditionLexer(condition: string) {
  let tempCondition;
  if (condition.includes("#FUNCTION_START#")) {
    const matches = condition.match(
      /((#FUNCTION_START#([$a-z.0-9\s?(){}\[\]._:'"`;=><,!-]|\n)+#FUNCTION_END#)|(__\$[a-z_?.()]+\$__))/gim,
    );
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
  } else {
    tempCondition = condition;
  }
  const counts = countSBrackets(tempCondition);
  let i = 0;
  let starter = new Condition("");
  while (i < tempCondition.length) {
    if (tempCondition[i] === "(") {
      const nest = new Condition("", starter);
      starter.add("#CONDITION#");
      starter.nest.push(nest);
      starter = nest;
    } else if (tempCondition[i] === ")") {
      if (starter.parent) starter = starter.parent;
      else break;
    } else {
      starter.add(tempCondition[i]);
    }
    i++;
  }
  return starter;
}
