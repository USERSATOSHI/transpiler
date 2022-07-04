import { Scope } from "../scope";
import { funcData, FunctionData } from "../typings/interface";
import { escapeResult, removeSetFunc } from "../util";

export const $clientOwnerId: FunctionData = {
  name: "$clientOwnerId",
  brackets: false,
  optional: true,
  type: "getter",
  version: "1.0.0",
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
  code: (data: funcData, scope: Scope[]) => {
    let setres;
    const separator = data.inside || ",";
    const currentScope = scope[scope.length - 1];
    if (
      !currentScope.setters.includes(
        "async function __$getClientOwnerId$__(sep)",
      )
    ) {
      setres = `
            async function __$getClientOwnerId$__(sep) {
                if(!__$DISCORD_DATA$__.client.application.owner) {
                    await __$DISCORD_DATA$__.client.application.fetch();
                }
                return __$DISCORD_DATA$__.client.application.owner instanceof DISCORDJS.User ? __$DISCORD_DATA$__.client.application.owner.id : __$DISCORD_DATA$__.client.application.owner.members.map(x => x.id).join(sep);
            }
        `;
      if (
        !currentScope.packages.includes(
          "const DISCORDJS = await import('discord.js');",
        )
      ) {
        currentScope.packages +=
          "const DISCORDJS = await import('discord.js');\n";
      }
      currentScope.functions += escapeResult(setres) + "\n";
    }
    let res = `await __$getClientOwnerId$__(\`${separator}\`)`;
    currentScope.rest = currentScope.rest.replace(
      data.total,
      escapeResult(res),
    );

    scope[scope.length - 1] = currentScope;
    return {
      code: escapeResult(res),
      scope: scope,
    };
  },
};
