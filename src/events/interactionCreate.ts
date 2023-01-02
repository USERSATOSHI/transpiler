import { Bot as AoiClient } from "aoi.js";
import {
  ButtonInteraction,
  CacheType,
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  Interaction,
  ModalSubmitInteraction,
  SelectMenuInteraction,
} from "discord.js";
import { LoadCommands } from "../loader";
export function onInteraction(client: AoiClient) {
  client.on("interactionCreate", async (interaction) => {
    await interactionCreate(interaction, client);
  });
}
export async function interactionCreate(
  interaction: Interaction<CacheType>,
  client: AoiClient,
) {
  if (interaction instanceof ChatInputCommandInteraction) {
    //@ts-ignore
    const cmds = (<LoadCommands>client.loader).paths[0].commandsLocation[
      "slashCommand"
    ];
    if (!cmds) return;
    const cmd = cmds.filter((c) => c.name === interaction.commandName);
    if (!cmd.size) return;

    for (const cmd of cmds.values()) {
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
    }
  } else if (interaction instanceof ContextMenuCommandInteraction) {
    //@ts-ignore
    const cmds = (<LoadCommands>client.loader).paths[0].commandsLocation[
      "contextMenuCommand"
    ];
    if (!cmds) return;
    const cmd = cmds.filter((c) => c.name === interaction.commandName);
    if (!cmd.size) return;

    for (const cmd of cmds.values()) {
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
    }
  } else if (interaction instanceof ModalSubmitInteraction) {
    //@ts-ignore
    const cmds = (<LoadCommands>client.loader).paths[0].commandsLocation[
      "modalCommand"
    ];
    if (!cmds) return;
    const cmd = cmds.filter(
      (c) => c.name.toLowerCase() === interaction.customId,
    );
    if (!cmd.size) return;

    for (const cmd of cmds.values()) {
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
    }
  } else if (interaction instanceof ButtonInteraction) {
    //@ts-ignore
    const cmds = (<LoadCommands>client.loader).paths[0].commandsLocation[
      "buttonCommand"
    ];
    if (!cmds) return;
    const cmd = cmds.filter((c) => c.name === interaction.customId);
    if (!cmd.size) return;

    for (const cmd of cmds.values()) {
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
    }
  } else if (interaction instanceof SelectMenuInteraction) {
    //@ts-ignore
    const cmds = (<LoadCommands>client.loader).paths[0].commandsLocation[
      "selectMenuCommand"
    ];
    if (!cmds) return;
    const cmd = cmds.filter((c) => c.name === interaction.customId);
    if (!cmd.size) return;

    for (const cmd of cmds.values()) {
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
    }
  }
}
