"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$jsonRequest = void 0;
const error_1 = require("../error");
const objectParser_1 = require("../objectParser");
const util_1 = require("../util");
exports.$jsonRequest = {
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
    description: "creates a json request to the given url with the given method and returns the response",
    default: ["void", "null", "null"],
    returns: "object",
    version: "1.0.0",
    code: (data, scope) => {
        const splits = data.splits;
        const currentScope = scope[scope.length - 1];
        if (exports.$jsonRequest.brackets) {
            if (!data.total.startsWith(exports.$jsonRequest.name + "[") &&
                (!currentScope.name.startsWith("$try_") ||
                    !currentScope.name.startsWith("$catch_"))) {
                throw new error_1.TranspilerError(`${data.name} requires closure brackets`);
            }
        }
        if (splits.length < 1 &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name} requires atleast 1 arguments`);
        }
        const url = splits[0];
        const method = splits[1] ?? "GET";
        const bodyorheaders = splits[2];
        let body = null, headers = null;
        if (splits.length === 4) {
            body = bodyorheaders;
            headers = splits.slice(3).join(";");
        }
        else {
            headers = bodyorheaders;
        }
        if (method &&
            method !== "GET" &&
            method !== "POST" &&
            method !== "PUT" &&
            method !== "DELETE" &&
            method !== "PATCH" &&
            method !== "HEAD" &&
            method !== "OPTIONS") {
            throw new error_1.TranspilerError(`${data.name} requires a valid method`);
        }
        if (url === "" &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new error_1.TranspilerError(`${data.name} requires a url`);
        }
        if (!currentScope["packages"].includes("const UNDICI = await import('undici');")) {
            currentScope["packages"] +=
                "const UNDICI = await import('undici');\n";
        }
        const currentObj = new objectParser_1.StringObject("{");
        currentObj.addEnd("}");
        const currentObj2 = new objectParser_1.StringObject("{");
        currentObj2.addEnd("}");
        let res = (0, util_1.escapeResult)(` await ( await UNDICI.fetch( \`${url}\`, {
      method:"${method}",
      body:${body ? (0, objectParser_1.parseStringObject)(headers, currentObj2) : null},
      headers: ${headers ? (0, objectParser_1.parseStringObject)(headers, currentObj) : undefined},
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
//# sourceMappingURL=jsonRequest.js.map