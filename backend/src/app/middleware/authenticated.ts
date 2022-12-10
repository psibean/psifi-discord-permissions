import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated) {
    next();
  } else {
    res.status(401).json(createHttpError(401, "Not logged in."));
  }
}