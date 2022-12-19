import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../state/user.slice.js";
import { DiscordUserData } from "../../../psd-types/src/types.js";
import Loading from "../components/util/Loading.js";
import { authenticatedPostJson } from "../util/api.js";
import RequestError from "../util/RequestError.js";
import { CLIENT_ROUTES } from "../util/constants.js";


export default () => {
  const [ searchParams ] = useSearchParams();
  const [access, setAccess] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    const handleLogin = async () => {
      try {
        const discordUserData = await authenticatedPostJson<DiscordUserData>(`/auth/discord/login?code=${code}&state=${state}`);
        dispatch(login(discordUserData!));
        navigate(CLIENT_ROUTES.DASHBOARD.GUILDS);
      } catch (error) {
        console.dir(error, { depth: null })
        if (error instanceof RequestError) {
          if (error.code === 401 || error.code === 403) {
            setAccess(false);
          } else if (error.code === 400) {
            navigate(CLIENT_ROUTES.ROOT)
          }
        }
      }
    }

    handleLogin();
  }, [])

  if (!access) {
    return <div className="m-auto">
      <h1 className="text-3xl">Whoops!</h1>
      Looks like you don't have access here.
    </div>
  }

  return <Loading text="Processing login..." />
}