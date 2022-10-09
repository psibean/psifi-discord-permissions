import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated) {
    next();
  } else {
    res.status(403).json(createHttpError(403, "Not logged in."));
  }
}