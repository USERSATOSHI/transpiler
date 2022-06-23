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
  default: ["void", "void"],
  returns: "void",
  description: "While statement",
  code: (data, scope) => {
    const splits = data.splits;
    const currentScope = scope[scope.length - 1];
    if (
      data.inside?.trim() === "" ||
      (!data.inside &&
        (!currentScope.name.startsWith("$try_") ||
          !currentScope.name.startsWith("$catch_")))
    ) {
      throw new TranspilerError(
        `${data.name} function requires condition and code`,
      );
    }
    if (
      data.splits.length < 2 &&
      !currentScope.name.startsWith("$try_") &&
      !currentScope.name.startsWith("$catch_")
    ) {
      throw new TranspilerError(
        `${data.name} function requires condition and code`,
      );
    }
    let [condition, ...code] = splits;
    const conditionFunctionList = getFunctionList(
      condition,
      Object.keys(funcs),
    );
    let executedCondition;
    if (conditionFunctionList.length) {
      executedCondition = Transpiler(condition, false, {
        variables: currentScope.variables,
        name: currentScope.name,
        objects: currentScope.objects,
        env: currentScope.env,
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
        name: currentScope.name,
        objects: currentScope.objects,
        env: currentScope.env,
      });
    } else {
      if (
        !currentScope.name.startsWith("$try_") ||
        !currentScope.name.startsWith("$catch_")
      )
        throw new TranspilerError(`${data.name} requires function in code`);
    }
    const res = escapeResult(`
while(${executedCondition}) {
  ${(<
    {
      code: string;
      scope: Scope[];
      func: any;
    }
  >executedCode)?.scope[0].getExecutable(false)}
}
`);
    data.funcs = [];
    currentScope.rest = currentScope.rest.replace(data.total, res);
    return { code: res, scope: scope, data };
  },
};
