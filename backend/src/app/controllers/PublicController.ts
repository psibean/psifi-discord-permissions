import { Request, Response } from 'express';
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
}