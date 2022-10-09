import type { Guild } from "discord.js";
import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import logger from "../../utils/logger.js";
import botClient from "../../bot/bot.js";
import { buildSelectedChannels, buildSelectedRoles, channelToChannelWithOverwrites, guildToListedGuild } from "../../utils/transformers.js";

export default class DiscordController {

  public async getGuild(req: Request, res: Response, next: NextFunction) {
    try {
      const guild = this.getGuildById(req);
      const roles = await guild.roles.fetch();

      return res.status(200).json({
        channels: buildSelectedChannels(guild.channels.cache),
        guild: guildToListedGuild(guild),
        roles: buildSelectedRoles(roles)
      });
    } catch(error) {
      logger.error(error);
      next(createHttpError(500, "Failed to get guild"));
    }
  }

  public getGuilds(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: Error handling
      const { guilds } = req.body as { guilds: Guild[] };

      const accessibleGuilds: Guild[] = [];

      for (const guild of guilds) {
        if (botClient.guilds.cache.has(guild.id)) {
          accessibleGuilds.push(guild);
        }
      }
      return res.status(200).json({ 
        guilds: accessibleGuilds.map(guild => guildToListedGuild(guild))
      });
    } catch (error) {
      logger.error(error);
      next(createHttpError(500, "Failed to get guilds."));
    }
  }

  public getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const guild = this.getGuildById(req);

      return res.status(200).json({ roles: guild.roles.cache.values() });
    } catch(error) {
      logger.error(error);
      next(createHttpError(500, "Failed to get roles."))
    }
  }

  public getChannels(req: Request, res: Response, next: NextFunction) {
    try {
      const guild = this.getGuildById(req);
      return res.status(200).json( 
        guild.channels.cache.map(channelToChannelWithOverwrites))
    } catch(error) {
      logger.error(error);
      if (typeof error === 'string') {
        next(createHttpError(500, "Failed to get channels."));
      } else {
        next(error);
      }
    }
  }

  public getChannel(req: Request, res: Response, next: NextFunction) {
    try {
      const { channelId } = req.params as { channelId: string };
      const guild = this.getGuildById(req);
      const channel = guild.channels.cache.get(channelId);
      if (!channel) 
        throw createHttpError(500, 'Channel not found.');

      res.status(200).json(channelToChannelWithOverwrites(channel));
    } catch(error) {
      logger.error(error);
      if (typeof error === 'string') 
        next(createHttpError(500, "Failed to get channel"));
      else
        next(error);
    }
  }

  private getGuildById(req: Request) {
    const { guildId } = req.params as { guildId: string };

    if (!botClient.guilds.cache.has(guildId)) {
      throw createHttpError(400, "Guild not found.");
    }
    return botClient.guilds.cache.get(guildId) as Guild;
  }
}