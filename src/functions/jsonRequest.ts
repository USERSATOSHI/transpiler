import { TranspilerError } from "../error";
import { parseStringObject, StringObject } from "../objectParser";
import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult } from "../util";
export const $jsonRequest: FunctionData = {
    name: "$jsonRequest",
    brackets: true,
    optional: false,
    type: "function_getter",
    fields: [
        {
            name: "url",
            type: "string",
            required: true,
        },
        {
            name: "method",
            type: "GET | POST | PUT | DELETE | PATCH | HEAD | OPTIONS",
            required: false,
        },
        {
            name: "body or headers",
            type: "any",
            required: false,
        },
        {
            name: "headers",
            type: "object",
            required: false,
        },
    ],
    description:
        "creates a json request to the given url with the given method and returns the response",
    default: ["void", "null", "null"],
    returns: "object",
    version: "1.0.0",
    code: (data: funcData, scope: Scope[]) => {
        const splits = data.splits;
        const currentScope = scope[scope.length - 1];
        if ($jsonRequest.brackets) {
            if (
                !data.total.startsWith($jsonRequest.name + "[") &&
                (!currentScope.name.startsWith("$try_") ||
                    !currentScope.name.startsWith("$catch_"))
            ) {
                throw new TranspilerError(
                    `${data.name} requires closure brackets`,
                );
            }
        }
        if (
            splits.length < 1 &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")
        ) {
            throw new TranspilerError(
                `${data.name} requires atleast 1 arguments`,
            );
        }
        const url = splits[0];
        const method = splits[1] ?? "GET";
        const bodyorheaders = splits[2];
        let body = null,
            headers = null;
        if (splits.length === 4) {
            body = bodyorheaders;
            headers = splits.slice(3).join(";");
        } else {
            headers = bodyorheaders;
        }
        if (
            method &&
            method !== "GET" &&
            method !== "POST" &&
            method !== "PUT" &&
            method !== "DELETE" &&
            method !== "PATCH" &&
            method !== "HEAD" &&
            method !== "OPTIONS"
        ) {
            throw new TranspilerError(`${data.name} requires a valid method`);
        }
        if (
            url === "" &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")
        ) {
            throw new TranspilerError(`${data.name} requires a url`);
        }
         if (
             !currentScope["packages"].includes(
                 "const UNDICI = await import('undici');",
             )
         ) {
             currentScope["packages"] +=
                 "const UNDICI = await import('undici');\n";
         }
        const currentObj = new StringObject("{");
        currentObj.addEnd("}");
        const currentObj2 = new StringObject("{");
        currentObj2.addEnd("}");

        let res = escapeResult(` await ( await UNDICI.fetch( \`${url}\`, {
      method:"${method}",
      body:${body ? parseStringObject(headers, currentObj2): null},
      headers: ${headers ? parseStringObject(headers, currentObj) : undefined},
    } ) ).json() `);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        data.funcs = [];
        return {
            code: res,
            scope: scope,
            data: data,
        };
    },
};
