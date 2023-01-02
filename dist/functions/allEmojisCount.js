"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$allEmojisCount = void 0;
const util_1 = require("../util");
exports.$allEmojisCount = {
    name: "$allEmojisCount",
    brackets: true,
    optional: true,
    type: "function_getter",
    fields: [],
    description: "returns all Emojis count",
    default: [],
    returns: "string",
    version: "1.0.0",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const type = data.inside ?? "all";
        if (!currentScope.setters.includes("async function __$allEmojisCount$__(type = 'all')")) {
            const setres = `
            async function __$allEmojisCount$__(type = 'all') {
                if(type === 'all') {
                    return await d.client.emojis.cache.size;
                } else {
                    return await d.client.emojis.cache.filter(e => type === 'animated' ? e.animated : type === 'managed' ? e.managed : type === 'normal' ?  !e.animated : true)).size;
                }
            }
        `;
            currentScope.functions += setres + "\n";
        }
        const res = (0, util_1.escapeResult)(`__$allEmojisCount$__(${type})`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=allEmojisCount.js.map