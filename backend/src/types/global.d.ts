import { OAuthUser } from "../app/models/OAuthUser";
import { OAuth2PKCEState } from "../app/config/oauth2/Oauth2PKCE";

declare module "express-session" {
  export interface SessionData {
    secret?: string;
    accessToken?: string;
    state?: OAuth2PKCEState;
    userId?: string;
  }

  export interface Request {
    user?: OAuthUser | undefined
  }
}

declare module "express" {
  export interface Request {
    user?: OAuthUser | undefined;
    isAuthenticated?: boolean;
  }

  export interface AuthenticatedRequest extends Request {
    user?: OAuthUser;
    state?: OAuth2PKCEState;
  }
}
