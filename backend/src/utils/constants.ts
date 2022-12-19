import { resolve } from "path";
import dirname from "./dirname.js";

export const PSD_ALLOWED_ORIGINS = process.env.PSD_ALLOWED_ORIGINS?.split(", ") ?? ["localhost", "localhost:5173"];
export const PSD_BOT_TOKEN = process.env.PSD_BOT_TOKEN
export const PSD_COOKIE_SECRET = process.env.PSD_COOKIE_SECRET;
export const PSD_FRONTEND_DOMAIN = process.env.PSD_FRONTEND_DOMAIN ?? 'localhost';
export const IS_PRODUCTION = (process.env.NODE_ENV ?? 'development') === 'production';
export const PORT = process.env.PSD_EXPRESS_PORT ?? 4444;
export const SESSION_MAX_AGE = 7.2e+6;
export const SESSION_SECRET = process.env.PSD_SESSION_SECRET as string;
export const PSD_CLIENT_ID = process.env.PSD_CLIENT_ID as string;
export const PSD_CLIENT_SECRET = process.env.PSD_CLIENT_SECRET as string;
export const SRC_DIR = resolve(dirname(import.meta.url), '..');

export const NOT_LOGGED_IN = "Not logged in.";
export const ACCESS_DENIED = "Access denied.";
export const GUILDS_INTERNAL_ERROR = "Failed to get guilds.";
export const ROLES_INTERNAL_ERROR = "Failed to get roles.";
export const CHANNELS_INTERNAL_ERROR = "Failed to get channels.";
export const GUILD_NOT_FOUND = "Guild not found.";
export const GUILD_INTERNAL_ERROR = "Failed to get guild.";
export const CHANNEL_NOT_FOUND = "Channel not found.";
export const CHANNEL_INTERNAL_ERROR = "Failed to get channel.";