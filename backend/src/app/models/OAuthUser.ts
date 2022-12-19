import { Client, Collection, PermissionFlagsBits, Snowflake } from "discord.js";
import { guildToListedGuild, oAuthGuildToListedGuild } from "../../utils/transformers";
import type { InternalOAuthProfile, OAuthGuild, DiscordUserData, ListedGuild } from "../../../../psd-types/src/types";
import { hasPermission } from "../../utils/filters";

export type OAuthUserOptions = {
  profile: InternalOAuthProfile;
  managedGuilds: OAuthGuild[];
}

export class OAuthUser {
  client: Client;
  profile: InternalOAuthProfile;
  guilds: Collection<Snowflake, ListedGuild>;
  accessToken: string;
  refreshToken: string;
  lastTouched: number;

  public constructor(client: Client, { profile, managedGuilds }: OAuthUserOptions) {
    this.client = client;
    this.profile = profile;

    this.guilds = new Collection(managedGuilds.map(oAuthGuild => {
      if (this.client.guilds.cache.has(oAuthGuild.id)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return [oAuthGuild.id, guildToListedGuild(this.client.guilds.cache.get(oAuthGuild.id)!)];
      }

      return [oAuthGuild.id, oAuthGuildToListedGuild(oAuthGuild)]
    }))
    this.lastTouched = Date.now();
  }

  public get id() {
    return this.profile.id;
  }

  public data(): DiscordUserData {
    return {
      profile: this.profile,
      guilds: Array.from(this.guilds.values())
    };
  }

  public touch() {
    this.lastTouched = Date.now();
  }
}