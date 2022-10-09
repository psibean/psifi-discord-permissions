import { PSD_API_URL } from '../util/constants.js';
import { SiDiscord } from 'react-icons/si';

export default () => {
  return <div className="container mx-auto px-4">
    
    <div className="w-full text-center mb-8">
      <h1 className="text-4xl md:text-5xl mb-4 lg:text-7xl pt-4">Psifi Security: Discord</h1>
      <p>
        Easily visualize the roles and permissions of your Discord server!
      </p>
    </div>

    <ul className="block list-disc">
      <li>
        Secured with OAuth2 Authorization Code Grant with PKCE and Double Submit Token Pattern CSRF protection!
      </li>
      <li>
        None of your data is stored until you explicitly save it, if you logout without saving, none of your information is saved to a database! 
      </li>
      <li>
        Download and delete your data at any time.
      </li>
    </ul>
    <div className="text-center w-full">
      <a href={`${PSD_API_URL}/auth/discord/login`}>
        <SiDiscord className="inline w-20 h-20" /><br />
        Discord Login
      </a>
    </div>
  </div>
}