import type { BaseFetchOptions, Client } from "discord.js";
import { CachedManager } from 'discord.js';
import botClient from "../../bot/bot.js";
import { OAuthUser, OAuthUserOptions } from "../models/OAuthUser.js";


export interface OAuthUserFetchOptions extends BaseFetchOptions {
  id: string;
}

export class OAuthUserManager extends CachedManager<string, OAuthUser, string> {
  public constructor(client: Client) {
    super(client, OAuthUser);
  }

  public create(options: OAuthUserOptions, store = true) {
    const oauthUser = new OAuthUser(this.client, options);
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
}

export const oAuthUserManager = new OAuthUserManager(botClient)