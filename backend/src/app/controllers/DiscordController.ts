import { Guild, PermissionFlagsBits } from "discord.js";
import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import botClient from "../../bot/bot.js";
import { buildSelectedChannels, buildSelectedRoles, channelToChannelWithOverwrites, guildToListedGuild } from "../../utils/transformers.js";
import { CHANNELS_INTERNAL_ERROR, CHANNEL_INTERNAL_ERROR, CHANNEL_NOT_FOUND, GUILDS_INTERNAL_ERROR, GUILD_INTERNAL_ERROR, GUILD_NOT_FOUND, ROLES_INTERNAL_ERROR } from "../../utils/constants.js";
import { Logger } from "pino";
import { guildAccessFilter } from "../../utils/filters.js";

export default class DiscordController {
  private logger: Logger;

  public constructor(logger: Logger) {
    this.logger = logger.child({ loggerName: "DiscordController" });
  }

  public async getGuild(req: Request, res: Response, next: NextFunction) {
    try {
      const guild = this.getGuildById(req);
      const roles = await guild.roles.fetch();
      const botMember = guild.members.resolve(botClient.user?.id ?? "");

      if (botMember === null) {
        throw new Error("Bot not in guild");
      }

      return res.status(200).json({
        channels: buildSelectedChannels(guild.channels.cache.filter(channel => channel.permissionsFor(botMember).has(PermissionFlagsBits.ViewChannel))),
        guild: guildToListedGuild(guild),
        roles: buildSelectedRoles(roles)
      });
    } catch(error) {
      this.logger.error(error);
      next(createHttpError(500, GUILD_INTERNAL_ERROR));
    }
  }

  public getGuilds(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: Error handling
      const requestUser = req.user;

      return res.status(200).json(
        botClient.guilds.cache.filter(guildAccessFilter(requestUser?.id)).map(guild => guildToListedGuild(guild))
      );
    } catch (error) {
      this.logger.error(error);
      next(createHttpError(500, GUILDS_INTERNAL_ERROR));
    }
  }

  public getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const guild = this.getGuildById(req);

      return res.status(200).json({ roles: guild.roles.cache.values() });
    } catch(error) {
      this.logger.error(error);
      next(createHttpError(500, ROLES_INTERNAL_ERROR))
    }
  }

  public getChannels(req: Request, res: Response, next: NextFunction) {
    try {
      const guild = this.getGuildById(req);
      return res.status(200).json( 
        guild.channels.cache.map(channelToChannelWithOverwrites))
    } catch(error) {
      this.logger.error(error);
      if (typeof error === 'string') {
        next(createHttpError(500, CHANNELS_INTERNAL_ERROR));
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
        throw createHttpError(404, CHANNEL_NOT_FOUND);

      res.status(200).json(channelToChannelWithOverwrites(channel));
    } catch(error) {
      this.logger.error(error);
      if (typeof error === 'string') 
        next(createHttpError(500, CHANNEL_INTERNAL_ERROR));
      else
        next(error);
    }
  }

  private getGuildById(req: Request) {
    const { guildId } = req.params as { guildId: string };

    if (!botClient.guilds.cache.has(guildId)) {
      throw createHttpError(400, GUILD_NOT_FOUND);
    }
    return botClient.guilds.cache.get(guildId) as Guild;
  }
}