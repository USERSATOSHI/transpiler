import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";
export const $messageReferenceId: FunctionData = {
    name: "$messageReferenceId",
    brackets: false,
    optional: true,
    type: "getter",
    fields: [],
    description: "returns the message's reference id",
    default: [],
    returns: "string",
    version: "1.0.0",
    code: (data: funcData, scope: Scope[]) => {
        const currentScope = scope[scope.length - 1];
        const res = escapeResult(`__$DISCORD_DATA$__.message?.reference?.id`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
