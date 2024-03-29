import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { NOT_LOGGED_IN } from '../../utils/constants.js';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated) {
    next();
  } else {
    next(createHttpError(401, NOT_LOGGED_IN));
  }
}