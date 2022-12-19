import { Guild, PermissionFlagsBits } from "discord.js"
import { OAuthGuild } from "../../../psd-types/src/types"

export const oAuthGuildAccessFilter = (oAuthGuild: OAuthGuild) => {
  return oAuthGuild.owner 
    || hasPermission(PermissionFlagsBits.Administrator, BigInt(oAuthGuild.permissions))
}

export const guildAccessFilter = (userId?: string) => {
  return (guild: Guild) => {
      if (guild.ownerId === userId) return true;

      const guildMemberMakingRequest = guild.members.cache.find(member => member.user.id === userId)
      
      if (!guildMemberMakingRequest) return false;
      
      return guildMemberMakingRequest.permissions.has(PermissionFlagsBits.Administrator);
  }
}

export const hasPermission = (permissionToCheck: bigint, permissions: bigint) => (permissions & permissionToCheck) === permissionToCheck;