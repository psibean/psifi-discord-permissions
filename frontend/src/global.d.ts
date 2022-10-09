import { OAuthUser } from "./app/models/OAuthUser";

declare namespace Express {
    export interface Request {
      user?: OAuthUser
    }
    export interface AuthenticatedRequest extends Request {
      user?: OAuthUser;
    }
}