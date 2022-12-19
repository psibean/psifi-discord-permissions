import { Guild, PermissionFlagsBits } from "discord.js"

export const guildAccessFilter = (userId?: string) => {
  return (guild: Guild) => {
    return userHasGuildAccess(userId, guild);
  }
}

export const userHasGuildAccess = async (userId: string | undefined, guild: Guild) => {
  if (!userId) return false;

  if (guild.ownerId === userId) return true;

  const guildMemberOfUser = await guild.members.fetch(userId);
  
  if (!guildMemberOfUser) return false;

  return guildMemberOfUser.permissions.has(PermissionFlagsBits.Administrator);
}

export const hasPermission = (permissionToCheck: bigint, permissions: bigint) => (permissions & permissionToCheck) === permissionToCheck;