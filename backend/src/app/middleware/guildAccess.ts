import { PermissionFlagsBits } from "discord.js";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import logger from "../../utils/logger";
import botClient from "../../bot/bot";

export default (req: Request, res: Response, next: NextFunction) => {
  const {
    guildId
  } = req.params;

  const user = req.user;
  const guild = botClient.guilds.cache.get(guildId);

  if (!user || !guild) {
    return res.status(403).json(createHttpError(403, 'Access denied.'));
  }

  if (guild.ownerId === user.id) {
    return next();
  }

  guild.members.fetch(user.id).then(member => {
    if (member.permissions.has(PermissionFlagsBits.Administrator)) {
      return next();
    }
    return res.status(403).json(createHttpError(403, 'Access denied.'));
  }).catch((error) => {
    logger.error(error);
    return res.status(403).json(createHttpError(403, 'Access denied.'));
  })
}