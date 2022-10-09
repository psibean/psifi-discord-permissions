import type { ChannelPermissionOverwrite, ChannelPermissionOverwrites, PermissionChannelTypes } from "../../../psd-types/src/types";
import { PermissionFlagsBits } from 'discord-api-types/v10';
import { SimulatedServerPermissions } from "../state/simulatedServer.slice";

const computeOverwrites = (
  basePermissions: bigint,
  memberRoles: string[],
  guildId: string,
  channelOverwrites: ChannelPermissionOverwrites = {},
  memberOverwrites?: string | ChannelPermissionOverwrite,
  ) => {
  if ((basePermissions & PermissionFlagsBits.Administrator) === PermissionFlagsBits.Administrator) {
    return PermissionFlagsBits.Administrator
  }

  let computedPermissions = basePermissions;

  if (channelOverwrites) {

    if (guildId in channelOverwrites) { 
      const everyoneOverwrites = channelOverwrites[guildId];
      if (everyoneOverwrites) {
        computedPermissions &= ~(BigInt(everyoneOverwrites.denies));
        computedPermissions |= BigInt(everyoneOverwrites.allows);
      }
    }

    let roleAllowedOverwrites = 0n;
    let roleDeniedOverwrites = 0n;
    
    for (const roleId of memberRoles) {
      if (roleId === guildId) continue;
      const roleOverwrites = channelOverwrites[roleId];
      if (roleOverwrites) {
        roleAllowedOverwrites |= BigInt(roleOverwrites.allows);
        roleDeniedOverwrites |= BigInt(roleOverwrites.denies);
      }
    }

    computedPermissions &= ~roleDeniedOverwrites;
    computedPermissions |= roleAllowedOverwrites;
  }

  let parsedMemberOverwrites: ChannelPermissionOverwrite | null = null;

  if (typeof memberOverwrites === 'string' && memberOverwrites in channelOverwrites) {
    parsedMemberOverwrites = channelOverwrites[memberOverwrites] as ChannelPermissionOverwrite;
  } else if (memberOverwrites) {
    parsedMemberOverwrites = memberOverwrites as ChannelPermissionOverwrite;
  }

  if (parsedMemberOverwrites !== null) {
    computedPermissions &= ~(BigInt(parsedMemberOverwrites.denies));
    computedPermissions |= BigInt(parsedMemberOverwrites.allows);
  }

  return computedPermissions;
}

const computeBasePermissions = (guildId: string, memberRoles: string[], rolePermissions: SimulatedServerPermissions) => {
  let permissions = 0n;
  permissions = BigInt(rolePermissions[guildId] ?? "0");

  for (const role of memberRoles) {
    if (role in memberRoles && role !== guildId)
      permissions |= BigInt(rolePermissions[role] ?? "0");
  }

  if ((permissions & PermissionFlagsBits.Administrator) === PermissionFlagsBits.Administrator) {
    return PermissionFlagsBits.Administrator;
  }

  return permissions;
}

/**
 * @param guildId The id of the guild, for the evryone role identifier
 * @param memberRoles An array of role identifiers, representing which roles the member has
 * @param rolePermissions An object of role identifiers mapped to their base permissions
 * @param channelOverwrites The channel specific overwrites
 * @returns A bigint representing the members calculated permissions for the channel, given the below rules.
 * 1. Base permissions given to '@everyone' are applied at a guild level
 * 2. Permissions allowed to a user by their roles are applied at a guild level
 * 3. Overwrites that deny permissions for '@everyone' are applied at a channel level
 * 4. Overwrites that allow permissions for '@everyone' are applied at a channel level
 * 5. Overwrites that deny permissions for specific roles are applied at a channel level
 * 6. Overwrites that allow permissions for specific roles are applied at a channel level
 * 7. Member-specific overwrites that deny permissions are applied at a channel level
 * 8. Member-specific overwrites that allow permissions are applied at a channel level
 */
export const computePermissions = (guildId: string, memberRoles: string[], rolePermissions: SimulatedServerPermissions, channelOverwrites: ChannelPermissionOverwrites | undefined) => {
  const basePermissions = computeBasePermissions(guildId, memberRoles, rolePermissions);
  return computeOverwrites(basePermissions, memberRoles, guildId, channelOverwrites)
}