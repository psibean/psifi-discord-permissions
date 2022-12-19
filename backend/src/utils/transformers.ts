import { Collection, Guild, GuildBasedChannel, Role } from "discord.js";
import { ChannelPermissionOverwrites, ListedGuild, SelectedGuildChannel, SelectedGuildChannels, SelectedGuildRole, SelectedGuildRoles } from "psd-types/src/types";

export const guildToListedGuild = (guild: Guild): ListedGuild => ({
    id: guild.id,
    icon: guild.iconURL(),
    name: guild.name,
    nameAcronym: guild.nameAcronym,
    bannerUrl: guild.bannerURL()
});

export const channelToChannelWithOverwrites = (channel: GuildBasedChannel): SelectedGuildChannel => {
  const permissionOverwrites: ChannelPermissionOverwrites = {};

  if ('permissionOverwrites' in channel) {
    channel.permissionOverwrites.cache.forEach((value, key) => {
      permissionOverwrites[key] = {
        allows: value.allow.toJSON(),
        denies: value.deny.toJSON()
      }
    });
  }

  return {
    id: channel.id,
    name: channel.name,
    type: channel.type,
    parent: channel.parentId,
    topic: "topic" in channel ? channel.topic : null,
    children: [],
    permissionOverwrites,
    position: "position" in channel ? channel.position : null,
    rawPosition: "rawPosition" in channel ? channel.rawPosition : null
  };
}

export const roleToSelectedGuildRole = (role: Role): SelectedGuildRole => {
  return {
    color: `#${role.color.toString(16)}`,
    icon: buildDiscordResourceUrl('icons', role.guild.id, role.guild.icon),
    id: role.id,
    name: role.name,
    permissions: role.permissions.bitfield.toString(),
    position: role.rawPosition
  };
}

export const buildSelectedChannels = (channels: Collection<string, GuildBasedChannel>): SelectedGuildChannels => {
  const selectedChannels: SelectedGuildChannels = {};
  channels.filter(channel => !channel.isThread()).forEach(channel => {
    selectedChannels[channel.id] = channelToChannelWithOverwrites(channel);
  })
  return selectedChannels;
}

export const buildSelectedRoles = (roles: Collection<string, Role>): SelectedGuildRoles => {
  const selectedRoles: SelectedGuildRoles = {};
  roles.forEach(role => {
    selectedRoles[role.id] = roleToSelectedGuildRole(role);
  })
  return selectedRoles;
}

export const buildDiscordResourceUrl = (resourceName: string, id: string, hash?: string | null) => {
  if (!hash) return null;
  const animatedFiletype = resourceName === 'icons' ? '.webp' : '.gif';

  return `https://cdn.discordapp.com/${resourceName}/${id}/${hash}${hash.startsWith('a') ? animatedFiletype : '.png'}`;
}