import { Request, Response } from 'express';
import { resolve } from 'path';
import dirname from '../..//utils/dirname.js';
import { FRONTEND_DOMAIN, IS_HOSTING, IS_PRODUCTION } from '../../utils/constants.js';
import { generateToken } from '../config/csrf.js';
import cryptoRandomString from 'crypto-random-string';

export default class PublicController {

  public getCsrfToken(req: Request, res: Response) {
    if (!req.session.secret) {
      req.session.secret = cryptoRandomString({ length: 10, type: 'ascii-printable' });
    }

    const csrfToken = generateToken(res, req);
    res.status(200).json({ token: csrfToken });
  }

  public getRoot(req: Request, res: Response) {
    if (IS_PRODUCTION || IS_HOSTING) {
      // Handle SPA
      res.sendFile(resolve(dirname(import.meta.url), '..', '..', 'public', 'index.html'));
    }
    else {
      res.redirect(FRONTEND_DOMAIN);
    }
  }
}