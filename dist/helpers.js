"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformGuild = exports.getUser = void 0;
async function getUser(userId, client) {
    return client.users.fetch(userId).catch(() => null);
}
exports.getUser = getUser;
async function transformGuild(guildId, client) {
    const guild = client.guilds.cache.get(guildId);
    if (!guild)
        return null;
    const transformedGuild = Object.assign({}, guild);
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
exports.transformGuild = transformGuild;
//# sourceMappingURL=helpers.js.map