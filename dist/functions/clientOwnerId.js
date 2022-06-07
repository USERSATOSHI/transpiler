"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$clientOwnerId = void 0;
const util_1 = require("../util");
exports.$clientOwnerId = {
    name: "$clientOwnerId",
    brackets: false,
    optional: true,
    type: "getter",
    fields: [
        {
            name: "separator",
            type: "string",
            required: false,
        },
    ],
    default: [","],
    returns: "string",
    description: "Returns the client's owner ID",
    code: (data, scope) => {
        let setres;
        const separator = data.inside || ",";
        const currentScope = scope[scope.length - 1];
        if (!currentScope.setters.includes("async function __$getClientOwnerId$__(sep)")) {
            setres = `
            async function __$getClientOwnerId$__(sep) {
                if(!__$DISCORD_DATA$__.client.application.owner) {
                    await __$DISCORD_DATA$__.client.application.fetch();
                }
                return __$DISCORD_DATA$__.client.application.owner instanceof DISCORDJS.User ? __$DISCORD_DATA$__.client.application.owner.id : __$DISCORD_DATA$__.client.application.owner.members.map(x => x.id).join(sep);
            }
        `;
            if (!currentScope.packages.includes("const DISCORDJS = await import('discord.js');")) {
                currentScope.packages +=
                    "const DISCORDJS = await import('discord.js');\n";
            }
            currentScope.functions += (0, util_1.escapeResult)(setres) + "\n";
        }
        let res = `await __$getClientOwnerId$__(\`${separator}\`)`;
        currentScope.rest = currentScope.rest.replace(data.total, (0, util_1.escapeResult)(res));
        scope[scope.length - 1] = currentScope;
        return {
            code: (0, util_1.escapeResult)(res),
            scope: scope,
        };
    },
};
//# sourceMappingURL=clientOwnerId.js.map