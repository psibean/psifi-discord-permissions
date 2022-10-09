import botClient from "./bot/bot.js";
import DiscordSecurityApp from "./app/app.js";
import express from 'express';
import { PORT } from "./utils/constants.js";
import logger from "./utils/logger.js";

process.on('uncaughtException', logger.error);

const server = express();

const app = new DiscordSecurityApp(botClient, server);

await app.start(PORT);