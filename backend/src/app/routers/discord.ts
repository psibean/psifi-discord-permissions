import { Router } from 'express';
import { logger } from '../../utils/logger.js';
import DiscordController from '../controllers/DiscordController.js';
import guildAccess from '../middleware/guildAccess.js';

const discordRouter = Router({
  caseSensitive: false
});

const discordController = new DiscordController(logger);

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
discordRouter.post('/guilds', (req, res, next) => discordController.getGuilds(req, res, next));
discordRouter.get('/guilds/:guildId', guildAccess, (req, res, next) => { void discordController.getGuild(req, res, next) });
discordRouter.get('/guilds/:guildId/roles', guildAccess, (req, res, next) => discordController.getRoles(req, res, next));
discordRouter.get('/guilds/:guildId/channels', guildAccess, (req, res, next) => discordController.getChannels(req, res, next));

export default discordRouter;