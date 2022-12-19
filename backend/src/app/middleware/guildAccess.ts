import { PermissionFlagsBits } from "discord.js";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { logger } from "../../utils/logger";
import botClient from "../../bot/bot";

export default (req: Request, res: Response, next: NextFunction) => {
  const {
    guildId
  } = req.params;

  const accessDeniedError = createHttpError(403, 'Access denied.');
  
  const user = req.user;
  const guild = botClient.guilds.cache.get(guildId);

  if (!user) {
    return next(accessDeniedError);
  }

  if (!guild) {
    return next(createHttpError(400, 'Bad request'));
  }

  if (guild.ownerId === user.id) {
    return next();
  }

  guild.members.fetch(user.id).then(member => {
    if (member.permissions.has(PermissionFlagsBits.Administrator)) {
      return next();
    }
    return next(accessDeniedError);
  }).catch((error) => {
    logger.error(error);
    return next(accessDeniedError);
  })
}