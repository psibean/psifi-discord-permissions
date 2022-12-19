import { doubleCsrf } from 'csrf-csrf';
import { PSD_FRONTEND_DOMAIN, IS_PRODUCTION } from '../../utils/constants.js';

export const {
  doubleCsrfProtection,
  generateToken
} = doubleCsrf({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-non-null-assertion
  getSecret: (req) => req!.session.secret as string,
  cookieName: 'psd-csrf-token',
  cookieOptions: {
    signed: true,
    sameSite: IS_PRODUCTION ? 'strict' : 'lax',
    secure: IS_PRODUCTION,
    domain: PSD_FRONTEND_DOMAIN,
    httpOnly: true
  }
});