import type { NextFunction, Request, Response } from "express";
import type {
    DiscordOAuthProfile,
    DiscordUserData,
    InternalOAuthProfile,
    OAuthGuild,
} from "../../../../psd-types/src/types";
import { oAuthUserManager } from "../managers/OAuthUserManager.js";
import { authorize, confirmAuthorization, oauth2 } from "../config/oauth2.js";
import logger from "../../utils/logger.js";
import {
    AccessTokenResponsePayload,
    OAuth2LoginErrorResponse,
    OAuth2ProtectedResourceErrorResponse,
} from "../config/oauth2/types.js";
import { buildDiscordResourceUrl } from "../../utils/transformers";
import createHttpError from "http-errors";

export type PassportDiscordOAuthHandler = (
    error: Error | string | undefined | null,
    user: DiscordUserData
) => void;

export default class AuthenticationController {
    public authorize(req: Request, res: Response) {
        authorize(req, res);
    }

    public login(req: Request, res: Response, next: NextFunction) {
        const userId = req.user?.id ?? "";
        if (req.isAuthenticated && oAuthUserManager.has(userId)) {
            const oAuthUser = oAuthUserManager.get(userId);
            return res.status(200).json(oAuthUser?.data() ?? {});
        }
        confirmAuthorization(req)
            .then((data) => this.discordLogin(data))
            .then((oauthUser) => {
                req.session.userId = oauthUser.id;
                res.status(200).json(oauthUser.data());
            })
            .catch(
                (
                    error:
                        | OAuth2LoginErrorResponse
                        | OAuth2ProtectedResourceErrorResponse
                        | Error
                        | string
                ) => {
                    logger.error(error);
                    if (typeof error === "string") {
                        res.status(500);
                        next(createHttpError(500, error));
                    } else if ("message" in error) {
                        res.status(401);
                        return next(createHttpError(401, error));
                    } else {
                        return next(createHttpError(500, error));
                    }
                }
            );
    }

    public logout(req: Request, res: Response) {
        if (!req.isAuthenticated) {
            return res.sendStatus(200);
        }

        oAuthUserManager.delete(req.session.userId ?? "");

        delete req.session.userId;
        // TODO: CHeck this is deleted earlier in the process
        delete req.session.state;

        req.session.regenerate((error: Error | null | undefined) => {
            if (error) logger.error(error);
            res.sendStatus(200);
        });
    }

    public discordLogin(data: AccessTokenResponsePayload) {
        const { access_token: accessToken } = data;
        const profileScopeUrl = "/api/users/@me";
        return oauth2
            .getProtectedResource<DiscordOAuthProfile>(
                profileScopeUrl,
                accessToken
            )
            .then((profile) => {
                return oauth2
                    .getProtectedResource<
                        OAuthGuild[] | OAuth2ProtectedResourceErrorResponse
                    >(`${profileScopeUrl}/guilds`, accessToken)
                    .then((guilds) => {
                      if ("message" in guilds) {
                          throw guilds;
                      } else {
                          const discordProfile: InternalOAuthProfile = {
                              accentColor: profile.accent_color ?? null,
                              avatar: buildDiscordResourceUrl(
                                  "avatars",
                                  profile.id,
                                  profile.avatar
                              ),
                              banner: buildDiscordResourceUrl(
                                  "banners",
                                  profile.id,
                                  profile.banner
                              ),
                              bannerColor: profile.banner_color ?? null,
                              displayName: `${profile.username}#${profile.discriminator}`,
                              id: profile.id,
                          };

                          const oauthUser = oAuthUserManager.create(
                            { profile: discordProfile, guilds },
                            false
                          );
                          oAuthUserManager.store(oauthUser);
                          return oauth2
                            .revokeToken(accessToken)
                            .then(() => oauthUser);
                        }
                    });
            });
    }
}
