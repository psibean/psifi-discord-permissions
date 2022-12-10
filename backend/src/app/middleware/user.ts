import type { Request, Response, NextFunction } from 'express';
import { oAuthUserManager } from '../managers/OAuthUserManager.js';
import { OAuthUser } from '../models/OAuthUser.js';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId && oAuthUserManager.has(req.session.userId)) {
    req.user = oAuthUserManager.get(req.session.userId) as OAuthUser;
    req.user.touch();
  }
  req.isAuthenticated = req.user !== undefined;
  next();
}