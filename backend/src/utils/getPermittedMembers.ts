import type { Guild } from "discord.js";
import { PermissionFlagsBits } from "discord.js";
import prisma from "../database/db.js";

export default async (guild: Guild) => {
  const guildSettings = await prisma.guild.findUnique({
    where: {
      id: guild.id
    }
  })

  const permittedMembers = [guild.ownerId];
  const roleId = guildSettings?.role ?? '';
  const onlyOwnerPermitted = guildSettings?.ownerOnly ?? true;

  // If the owner isn't the only one permitted, we need to gather the other users who are!
  if (!onlyOwnerPermitted) {
    const members = await guild.members.fetch();
    for (const member of members.values()) {
      const isMemberAdmin = member.permissions.has(PermissionFlagsBits.Administrator, false);
      if (isMemberAdmin || member.roles.cache.has(roleId)) {
        permittedMembers.push(member.user.id);
      }
    }
  }
  return permittedMembers;
}