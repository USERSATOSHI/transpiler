import { Client, Guild, Snowflake } from "discord.js";
import { TransformedGuild } from "./typings/interface";

export async function getUser(userId: Snowflake, client: Client) {
  return client.users.fetch(userId).catch(() => null);
}

export async function transformGuild(guildId: Snowflake, client: Client) {
  const guild = client.guilds.cache.get(guildId);
  if (!guild) return null;
  const transformedGuild: TransformedGuild = <TransformedGuild>(
    (<unknown>Object.assign({}, guild))
  );
  (transformedGuild.afkChannel = {
    id: guild.afkChannelId,
    name: guild.afkChannel?.name,
  }),
    (transformedGuild.icon = guild.iconURL({ size: 4096 }));
  transformedGuild.splash = guild.splashURL({ size: 4096 });
  const owner = await guild.fetchOwner();
  transformedGuild.owner = {
    id: guild.ownerId,
    name: owner?.user.username,
    nick: owner.nickname,
  };
  transformedGuild.membersId = guild.members.cache.map((m) => m.id);
  transformedGuild.channelsId = guild.channels.cache.map((c) => c.id);
  transformedGuild.rolesId = guild.roles.cache.map((r) => r.id);
  transformedGuild.emojisId = guild.emojis.cache.map((e) => e.id);
  transformedGuild.stickersId = guild.stickers.cache.map((s) => s.id);
  transformedGuild.systemChannel = {
    id: guild.systemChannelId,
    name: guild.systemChannel?.name,
  };
  transformedGuild.rulesChannel = {
    id: guild.rulesChannelId,
    name: guild.rulesChannel?.name,
  };
  transformedGuild.publicUpdatesChannel = {
    id: guild.publicUpdatesChannelId,
    name: guild.publicUpdatesChannel?.name,
  };
  transformedGuild.bans = [...guild.bans.cache.keys()].join(",");
  transformedGuild.commands = guild.commands.cache.size;
  transformedGuild.partnered = guild.partnered;
  transformedGuild.verified = guild.verified;
  transformedGuild.mfaLevel = guild.mfaLevel;
  transformedGuild.explicitContentFilter = guild.explicitContentFilter;
  transformedGuild.defaultMessageNotifications =
    guild.defaultMessageNotifications;
  transformedGuild.systemChannelFlags = guild.systemChannelFlags;
  transformedGuild.premiumTier = guild.premiumTier;
  transformedGuild.premiumSubscriptionCount = guild.premiumSubscriptionCount;
  transformedGuild.preferredLocale = guild.preferredLocale;
  return transformedGuild;
}
