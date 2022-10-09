import { Guild } from "discord.js";
import prisma from "../db.js";

export class GuildRepository {
  public getGuildSettings(guild: Guild) {
    return prisma.guild.findUnique({
      where: {
        id: guild.id
      }
    })
  }

  public deleteGuildSettings(guild: Guild) {
    return prisma.guild.delete({
      where: {
        id: guild.id
      }
    })
  }
}

export const guildRepository = new GuildRepository();