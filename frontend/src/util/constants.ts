
export const PSD_API_URL = `/api`;
export const PSD_FRONTEND_DOMAIN = import.meta.env.PSD_FRONTEND_DOMAIN as string | undefined ?? `localhost:5173`;
export const PSD_PROTOCOL = import.meta.env.PSD_PROTOL as string | undefined ?? "https";
export const PSD_CLIENT_ID = import.meta.env.PSD_CLIENT_ID as string | undefined ?? "643569569176223744";
export const AUTHORIZE_URL = "https://discord.com/oauth2/authorize";
export const GUILD_REDIRECT_URI = `${PSD_PROTOCOL}://${PSD_FRONTEND_DOMAIN}/auth/guild/invite`;

export const CLIENT_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    GUILD_INVITE: "/auth/guild/invite"
  },
  DASHBOARD: {
    ROOT: "/dashboard",
    CHANNEL: "guilds/:guildId/channels/:channelId",
    CHANNEL_OVERWRITES: "guilds/:guildId/channels/:channelId/overwrites",
    CHANNELS: "guilds/:guildId/channels",
    GUILD: "/dashboard/guilds/:guildId",
    GUILDS: "/dashboard/guilds",
    USER: {
      ACCOUNT: "user/account",
      SETTINGS: "user/settings",
    }
  },
  PRIVACY: "/privacy",
  ROOT: "/",
  SECURITY: "/security",
  TOS: "/terms-of-service"
}

const DISCORD_GUILDS = "/discord/guilds";

export const API_ROUTES = {
  CSRF_TOKEN: "/csrftoken",
  GUILD: (guildId: string) => `${DISCORD_GUILDS}/${guildId}`,
  GUILDS: DISCORD_GUILDS,
  GUILD_CHANNELS: (guildId: string) => `${DISCORD_GUILDS}/${guildId}/channels`,
  CHANNEL: (guildId: string, channelId: string) => `${DISCORD_GUILDS}/${guildId}/channels/${channelId}`,
  USER: "/users/@me"
}