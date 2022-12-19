import type { BaseFetchOptions, Client } from "discord.js";
import { CachedManager } from 'discord.js';
import { InternalOAuthProfile } from "../../../../psd-types/src/types.js";
import botClient from "../../bot/bot.js";
import { OAuthUser } from "../models/OAuthUser.js";


export interface OAuthUserFetchOptions extends BaseFetchOptions {
  id: string;
}

export class OAuthUserManager extends CachedManager<string, OAuthUser, string> {
  public static SWEEP_INTERVAL = 1.8e+6;

  public constructor(client: Client) {
    super(client, OAuthUser);
    setTimeout(() => this.sweep(), OAuthUserManager.SWEEP_INTERVAL)
  }

  public create(profile: InternalOAuthProfile, store = true) {
    const oauthUser = new OAuthUser(this.client, profile);
    if (store) {
      this.cache.set(oauthUser.id, oauthUser);
    }
    return oauthUser;
  }

  public store(oAuthUser: OAuthUser) {
    this.cache.set(oAuthUser.id, oAuthUser);
  }

  public get(id: string) {
    return this.cache.get(id);
  }

  public has(id: string) {
    return this.cache.has(id);
  }

  public delete(id: string) {
    this.cache.delete(id);
  }

  public sweep() {
    const expiredUsers = Array.from(this.cache.values()).filter(oAuthUser => 
      (Date.now() - oAuthUser.lastTouched) >= OAuthUserManager.SWEEP_INTERVAL
    )
    for (const oauthUser of expiredUsers) {
      this.delete(oauthUser.id);
    }
    setTimeout(() => this.sweep(), OAuthUserManager.SWEEP_INTERVAL)
  }
}

export const oAuthUserManager = new OAuthUserManager(botClient)