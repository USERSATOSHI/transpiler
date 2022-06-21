"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageCreate = exports.onMessage = void 0;
function onMessage(client) {
    client.client.on("messageCreate", async (message) => {
        await messageCreate(message, client);
    });
}
exports.onMessage = onMessage;
async function messageCreate(message, client) {
    const prefix = client.prefixes.find((c) => message.content.startsWith(c));
    if (!prefix)
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift()?.toLowerCase();
    if (!cmd)
        return;
    const commands = client.loader.paths[0].commandsLocation["basicCommand"]?.filter((c) => c.name.toLowerCase() === cmd || (c.aliases ? c.aliases.includes(cmd) : false));
    if (!commands?.size)
        return;
    for (const cmd of commands.values()) {
        await cmd.__compiled__.func({
            message,
            channel: message.channel,
            guild: message.guild,
            author: message.author,
            client: client.client,
            args,
            bot: client,
            member: message.member,
            command: cmd,
        });
    }
}
exports.messageCreate = messageCreate;
//# sourceMappingURL=messageCreate.js.map