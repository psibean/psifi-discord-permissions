import { PSD_CLIENT_ID, PSD_CLIENT_SECRET } from '../../utils/constants.js';
import OAuth2PKCE from './oauth2/Oauth2PKCE.js';

const {
  authorize,
  confirmAuthorization,
  oauth2
} = OAuth2PKCE({
  scopes: ['identify', 'guilds'],
  oauthClientOptions: {
    authorizeUrl:  "/oauth2/authorize",
    baseUrl: "https://discord.com",
    clientId: PSD_CLIENT_ID,
    clientSecret: PSD_CLIENT_SECRET,
    accessTokenUrl: "/api/oauth2/token",
    redirectUrl: "http://localhost:5173/auth/login"
  },
  retrieveState: (req) => {
    return req.session.state;
  },
  storeState: (req, state) => {
    req.session.state = state
  }
})

export {
  authorize,
  confirmAuthorization,
  oauth2
}