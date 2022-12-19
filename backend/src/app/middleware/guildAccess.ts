import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import botClient from "../../bot/bot";
import { userHasGuildAccess } from "../../utils/filters";

export default async (req: Request, res: Response, next: NextFunction) => {
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

  if (await userHasGuildAccess(req.user?.id, guild)) {
    return next();
  }

  return next(accessDeniedError);
}