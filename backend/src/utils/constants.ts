import { resolve } from "path";
import dirname from "./dirname.js";

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(", ") ?? ["localhost", "localhost:5173"];
export const PSD_BOT_TOKEN = process.env.PSD_BOT_TOKEN
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN ?? 'localhost';
export const IS_HOSTING = process.env.HOSTING === 'static';
export const IS_PRODUCTION = (process.env.NODE_ENV ?? 'development') === 'production';
export const PORT = process.env.EXPRESS_PORT ?? 4444;
export const SESSION_MAX_AGE = 7.2e+6;
export const SESSION_SECRET = process.env.SESSION_SECRET as string;
export const PSD_CLIENT_ID = process.env.PSD_CLIENT_ID as string;
export const PSD_CLIENT_SECRET = process.env.PSD_CLIENT_SECRET as string;
export const SRC_DIR = resolve(dirname(import.meta.url), '..');