import { conditionLexer } from "../conditionlexer";
import { TranspilerError } from "../error";
import { FunctionData } from "../typings/interface";
import { escapeFunctionResult, escapeResult, getFunctionList } from "../util";
import { datas as funcs } from ".";
import { Transpiler } from "../transpiler";
import { Scope } from "../scope";
export const $while: FunctionData = {
  name: "$while",
  type: "scope",
  brackets: true,
  optional: false,
  fields: [
    {
      name: "condition",
      type: "string",
      required: true,
    },
    {
      name: "code",
      type: "string",
      required: true,
    },
  ],
  code: (data, scope) => {
    const splits = data.splits;
    if (data.inside?.trim() === "" || !data.inside) {
      throw new TranspilerError(
        `${data.name} function requires condition and code`,
      );
    }
    if (data.splits.length < 2) {
      throw new TranspilerError(
        `${data.name} function requires condition and code`,
      );
    }
    let [condition, ...code] = splits;
    const currentScope = scope[scope.length - 1];
    const conditionFunctionList = getFunctionList(
      condition,
      Object.keys(funcs),
    );
    let executedCondition;
    if (conditionFunctionList.length) {
      executedCondition = Transpiler(condition, false, {
        variables: currentScope.variables,
      });
      currentScope.functions += executedCondition.scope[0].functions + "\n";
      currentScope.packages += executedCondition.scope[0].packages;
      executedCondition = executedCondition.code;
    } else {
      executedCondition = condition;
    }
    executedCondition = conditionLexer(executedCondition);
    executedCondition = executedCondition.solve(false);
    const hash = Math.floor(Math.random() * 100000);
    let executedCode;
    const codeFunctionList = getFunctionList(
      code.join(";"),
      Object.keys(funcs),
    );
    if (codeFunctionList.length) {
      executedCode = Transpiler(code.join(";"), false, {
        variables: currentScope.variables,
        embeds: currentScope.embeds,
      });
    } else {
      throw new TranspilerError(`${data.name} requires function in code`);
    }
    const res = escapeResult(`
while(${executedCondition}) {
  ${executedCode.scope[0].getExecutable(false)}
}
`);
    data.funcs = [];
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return { code: res, scope: scope, data };
  },
};
