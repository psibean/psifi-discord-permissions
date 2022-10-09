import type { ChannelType, Snowflake } from 'discord-api-types/v10';


export type PermissionChannelTypes = {
  stage?: boolean;
  text?: boolean;
  voice?: boolean;
}

export type PermissionData = {
  name: string;
  description: string;
  channelTypes: PermissionChannelTypes
}

export type OAuthGuild = {
  id: string;
  name: string;
  icon: string,
  owner: boolean,
  permissions: string,
  features: string[]
}

export type DiscordOAuthProfileEmail = {
  email: string;
  verified: boolean;
}

export type DiscordOAuthProfilePhoto = {
  primary: boolean;
  type: string;
  value: string;
}

export type DiscordOAuthProfileJson = {
  accent_color: number;
  avatar: string;
  avatar_description: string | null;
  banner: string | null;
  banner_color: string;
  discriminator: string;
  email: string;
  flags: number;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  premium_type: boolean;
  public_flags: number;
  username: string;
  verified: boolean;
}
export interface DiscordOAuthProfile {
  accent_color?: number;
  avatar?: string;
  avatar_description: string | null;
  banner?: string;
  banner_color: string;
  created: string;
  discriminator: string;
  email: string;
  flags: number;
  id: Snowflake;
  locale?: string;
  mfa_enabled?: boolean;
  premium_type?: number;
  public_flags?: number;
  username: string;
  verified?: boolean;
  sysetem?: boolean;
}


export type InternalOAuthProfile = {
    accentColor: number | null;
    avatar: string | null;
    banner: string | null;
    bannerColor: string | null;
    displayName: string;
    id: string;
}

export type DiscordUserData = {
  profile: InternalOAuthProfile;
  guilds: ListedGuild[];
}

export type SelectedGuildRole = {
  color: string;
  icon: string | null;
  id: string;
  name: string;
  permissions: string;
  position: number;
}

export interface ListedGuildInterface {
  access: boolean;
  id: string;
  icon: string | null;
  name: string;
  nameAcronym: string;
  bannerUrl: string | null;
}

export type ListedGuildWithAccess = ListedGuildInterface & {
  access: true;
  bannerUrl: string | null;
}

export type ListedGuildWithoutAccess = ListedGuildInterface & {
  access: false;
  bannerUrl: null;
}

export type ListedGuild = ListedGuildWithAccess | ListedGuildWithoutAccess;

export type ChannelPermissionOverwrite = {
  allows: string;
  denies: string;
}

export type ChannelPermissionOverwrites = Record<string, ChannelPermissionOverwrite | undefined>;

export type SelectedChannelType = ChannelType.GuildText | ChannelType.GuildVoice | ChannelType.GuildCategory | ChannelType.GuildAnnouncement | ChannelType.AnnouncementThread | ChannelType.PublicThread | ChannelType.PrivateThread | ChannelType.GuildStageVoice | ChannelType.GuildForum;

export interface SelectedGuildChannel {
  id: Snowflake;
  name: string;
  type: SelectedChannelType;
  parent: string | null;
  topic: string | null;
  children: SelectedGuildChannel[];
  permissionOverwrites: ChannelPermissionOverwrites;
  position: number | null;
  rawPosition: number | null;
}

export interface SelectedGuildCategory extends SelectedGuildChannel {
  children: SelectedGuildChannel[];
}

export type SelectedGuildRoles = Record<string, SelectedGuildRole>;
export type SelectedGuildChannels = Record<string, SelectedGuildChannel>;