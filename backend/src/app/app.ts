import { type Guild, PermissionFlagsBits, type Client } from 'discord.js';
import cookieParser from 'cookie-parser';
import cors from './config/cors.js';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import session from './config/session.js';

import { IS_HOSTING, PSD_BOT_TOKEN } from '../utils/constants.js';
import rootRouter from './routers/root.js';
import logger from '../utils/logger.js';
import getPermittedMembers from '../utils/getPermittedMembers.js';
import { oAuthUserManager } from './managers/OAuthUserManager.js';
import { guildRepository } from '../database/repositories/GuildRepository.js';
import prisma from '../database/db.js';
import user from './middleware/user.js';
import { guildToListedGuild } from '../utils/transformers.js';
import { Logger } from 'pino';


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

    botClient.on('guildCreate', async guild => {
      // When a new guild is joined, we want to update existing cache.
      try {
        const permittedMembers = await getPermittedMembers(guild);
    
        for (const userId of permittedMembers) {
          if (oAuthUserManager.cache.has(userId)) {
            oAuthUserManager.cache.get(userId)?.guilds.set(guild.id, guildToListedGuild(guild));
          }
        }
      } catch(error) {
        this.logger.error(error);
      }
    })
    
    const handleGuildRemoval = async (guild: Guild) => {
      try {
        const permittedMembers = await getPermittedMembers(guild);
    
        for (const userId of permittedMembers) {
          const oAuthUser = oAuthUserManager.cache.get(userId);
          if (oAuthUser) {
            oAuthUser.guilds.delete(guild.id);
          }
        }
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
    
    botClient.on('guildMemberUpdate', async(oldMember, newMember) => {
      try {
        const oAuthUser = oAuthUserManager.cache.get(oldMember.user.id);
        if (oAuthUser) {
          const guildSettings = await guildRepository.getGuildSettings(oldMember.guild);
          const role = guildSettings?.role ?? '';
          const onlyOwnerPermitted = guildSettings?.ownerOnly ?? true;
          if (!onlyOwnerPermitted) {
            const hadAdmin = oldMember.permissions.has(PermissionFlagsBits.Administrator);
            const hasAdmin = newMember.permissions.has(PermissionFlagsBits.Administrator);
    
            const hadRole = oldMember.roles.cache.has(role);
            const hasRole = newMember.roles.cache.has(role);
    
            const addGuildForUser = (!hadAdmin || !hadRole) && (hasAdmin || hasRole);
            const removeGuilderForUser = (hadAdmin || hadRole) && (!hasAdmin && !hasRole);
    
            if (addGuildForUser) {
              oAuthUser.guilds.set(oldMember.guild.id, guildToListedGuild(oldMember.guild));
            } else if (removeGuilderForUser) {
              oAuthUser.guilds.delete(oldMember.guild.id);
            }
          }
        }
      } catch(error) {
        this.logger.error(error);
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
