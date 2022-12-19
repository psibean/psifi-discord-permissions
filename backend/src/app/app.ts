import { type Guild, PermissionFlagsBits, type Client } from 'discord.js';
import cookieParser from 'cookie-parser';
import cors from './config/cors.js';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import session from './config/session.js';

import { IS_HOSTING, PSD_BOT_TOKEN } from '../utils/constants.js';
import rootRouter from './routers/root.js';
import { logger } from '../utils/logger.js';
import getPermittedMembers from '../utils/getPermittedMembers.js';
import { oAuthUserManager } from './managers/OAuthUserManager.js';
import { guildRepository } from '../database/repositories/GuildRepository.js';
import prisma from '../database/db.js';
import user from './middleware/user.js';
import { guildToListedGuild } from '../utils/transformers.js';
import type { Logger } from 'pino';


export default class DiscordSecurityApp {
  public server: ReturnType<typeof express>;
  public botClient: Client
  private logger: Logger;

  public constructor(botClient: Client, logger: Logger, server: ReturnType<typeof express>) {
    this.botClient = botClient;
    this.logger = logger.child({ loggerName: "DiscordSecurityApp" });
    this.server = server;
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(express.json({ }))

    this.server.use(
      helmet({
        contentSecurityPolicy: IS_HOSTING ?? false
      })
    );

    this.server.use(cors);
    this.server.use(session);
    this.server.use(cookieParser(process.env.COOKIE_SECRET));
    this.server.use(user);

    this.server.set('trust proxy', 1);

    this.server.use('/', rootRouter);

    this.server.use((error: string | Error | undefined, req: Request, res: Response, next: NextFunction) => {
      if (error) {
        return res.json({ error })
      }
      next();
    })
    
    const handleGuildRemoval = (guild: Guild) => {
      try {
        void guildRepository.deleteGuildSettings(guild);
      } catch(error) {
        this.logger.error(error);
      }
    }
    
    botClient.on('guildDelete', (guild) => {
      void handleGuildRemoval(guild);
    })
    
    botClient.on('guildUpdate', (oldGuild, newGuild) => {
      if (oldGuild.ownerId !== newGuild.ownerId) {
        void handleGuildRemoval(oldGuild);
      }
    })
  }

  public async start(port: string | number) {
    this.botClient.once('ready', () => {
      this.server.listen(port, () => {
        logger.info(`Express test app is listening at http://localhost:${port}`);
      })
    });

    await prisma.session.deleteMany();

    void this.botClient.login(PSD_BOT_TOKEN);
  }
}
