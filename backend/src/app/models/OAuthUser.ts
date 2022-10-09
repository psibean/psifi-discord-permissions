import { Client, Collection, PermissionFlagsBits, Snowflake } from "discord.js";
import { guildToListedGuild, oAuthGuildToListedGuild } from "../../utils/transformers";
import type { InternalOAuthProfile, OAuthGuild, DiscordUserData, ListedGuild } from "../../../../psd-types/src/types";

export type OAuthUserOptions = {
  profile: InternalOAuthProfile;
  guilds: OAuthGuild[];
}

export class OAuthUser {
  client: Client;
  profile: InternalOAuthProfile;
  guilds: Collection<Snowflake, ListedGuild>;
  accessToken: string;
  refreshToken: string;

  public constructor(client: Client, { profile, guilds }: OAuthUserOptions) {
    this.client = client;
    this.profile = profile;

    const managedGuilds = guilds.filter(guild => guild.owner || BigInt(guild.permissions) & PermissionFlagsBits.Administrator);
    this.guilds = new Collection(managedGuilds.map(oAuthGuild => {
      if (this.client.guilds.cache.has(oAuthGuild.id)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return [oAuthGuild.id, guildToListedGuild(this.client.guilds.cache.get(oAuthGuild.id)!)];
      }

      return [oAuthGuild.id, oAuthGuildToListedGuild(oAuthGuild)]
    }))
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
}