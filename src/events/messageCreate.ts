import { AoiClient } from "aoi.js";
import { Collection, Message } from "discord.js";
import { Command } from "../command";
import { LoadCommands } from "../loader";
export function onMessage(client: AoiClient) {
  client.client.on("messageCreate", async (message) => {
    await messageCreate(message, client);
  });
}
export async function messageCreate(message: Message, client: AoiClient) {
  const prefix = client.prefixes.find((c) => message.content.startsWith(c));
  if (!prefix) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift()?.toLowerCase();
  if (!cmd) return;
  const commands = <Collection<number, Command>>(<
    unknown // @ts-ignore
  >(<LoadCommands>client.loader).paths[0].commandsLocation["basicCommand"]?.filter((c: Command) => c.name.toLowerCase() === cmd || (c.aliases ? c.aliases.includes(cmd) : false)));

  if (!commands?.size) return;
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
