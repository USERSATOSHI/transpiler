"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionCreate = exports.onInteraction = void 0;
const discord_js_1 = require("discord.js");
function onInteraction(client) {
    client.client.on("interactionCreate", async (interaction) => {
        await interactionCreate(interaction, client);
    });
}
exports.onInteraction = onInteraction;
async function interactionCreate(interaction, client) {
    if (interaction instanceof discord_js_1.ChatInputCommandInteraction) {
        //@ts-ignore
        const cmds = client.loader.paths[0].commandsLocation["slashCommand"];
        if (!cmds)
            return;
        const cmd = cmds.filter((c) => c.name === interaction.commandName);
        if (!cmd.size)
            return;
        for (const cmd of cmds.values()) {
            const start = performance.now();
            await cmd.__compiled__.func({
                interaction,
                channel: interaction.channel,
                guild: interaction.guild,
                author: interaction.user,
                member: interaction.member,
                client: client.client,
                bot: client,
                command: cmd,
            });
            console.log("transpiler: " + (performance.now() - start));
        }
    }
    else if (interaction instanceof discord_js_1.ContextMenuCommandInteraction) {
        //@ts-ignore
        const cmds = client.loader.paths[0].commandsLocation["contextMenuCommand"];
        if (!cmds)
            return;
        const cmd = cmds.filter((c) => c.name === interaction.commandName);
        if (!cmd.size)
            return;
        for (const cmd of cmds.values()) {
            const start = performance.now();
            await cmd.__compiled__.func({
                interaction,
                channel: interaction.channel,
                guild: interaction.guild,
                author: interaction.user,
                member: interaction.member,
                client: client.client,
                bot: client,
                command: cmd,
            });
            console.log("transpiler: " + (performance.now() - start));
        }
    }
    else if (interaction instanceof discord_js_1.ModalSubmitInteraction) {
        //@ts-ignore
        const cmds = client.loader.paths[0].commandsLocation["modalCommand"];
        if (!cmds)
            return;
        const cmd = cmds.filter((c) => c.name.toLowerCase() === interaction.customId);
        if (!cmd.size)
            return;
        for (const cmd of cmds.values()) {
            const start = performance.now();
            await cmd.__compiled__.func({
                interaction,
                channel: interaction.channel,
                guild: interaction.guild,
                author: interaction.user,
                member: interaction.member,
                client: client.client,
                bot: client,
                command: cmd,
            });
            console.log("transpiler: " + (performance.now() - start));
        }
    }
    else if (interaction instanceof discord_js_1.ButtonInteraction) {
        //@ts-ignore
        const cmds = client.loader.paths[0].commandsLocation["buttonCommand"];
        if (!cmds)
            return;
        const cmd = cmds.filter((c) => c.name === interaction.customId);
        if (!cmd.size)
            return;
        for (const cmd of cmds.values()) {
            const start = performance.now();
            await cmd.__compiled__.func({
                interaction,
                channel: interaction.channel,
                guild: interaction.guild,
                author: interaction.user,
                member: interaction.member,
                client: client.client,
                bot: client,
                command: cmd,
            });
            console.log("transpiler: " + (performance.now() - start));
        }
    }
    else if (interaction instanceof discord_js_1.SelectMenuInteraction) {
        //@ts-ignore
        const cmds = client.loader.paths[0].commandsLocation["selectMenuCommand"];
        if (!cmds)
            return;
        const cmd = cmds.filter((c) => c.name === interaction.customId);
        if (!cmd.size)
            return;
        for (const cmd of cmds.values()) {
            const start = performance.now();
            await cmd.__compiled__.func({
                interaction,
                channel: interaction.channel,
                guild: interaction.guild,
                author: interaction.user,
                member: interaction.member,
                client: client.client,
                bot: client,
                command: cmd,
            });
            console.log("transpiler: " + (performance.now() - start));
        }
    }
}
exports.interactionCreate = interactionCreate;
//# sourceMappingURL=interactionCreate.js.map