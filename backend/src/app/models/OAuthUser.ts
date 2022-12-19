import { Client } from "discord.js";
import type { InternalOAuthProfile } from "../../../../psd-types/src/types";

export type OAuthUserOptions = {
  profile: InternalOAuthProfile;
}

export class OAuthUser {
  client: Client;
  profile: InternalOAuthProfile;
  accessToken: string;
  refreshToken: string;
  lastTouched: number;

  public constructor(client: Client, profile: InternalOAuthProfile) {
    this.client = client;
    this.profile = profile;

    this.lastTouched = Date.now();
  }

  public get id() {
    return this.profile.id;
  }

  public data(): InternalOAuthProfile {
    return this.profile;
  }

  public touch() {
    this.lastTouched = Date.now();
  }
}