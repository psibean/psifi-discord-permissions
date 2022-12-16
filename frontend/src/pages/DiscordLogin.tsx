import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../state/user.slice.js";
import { DiscordUserData } from "../../../psd-types/src/types.js";
import Loading from "../components/util/Loading.js";
import { authenticatedPost, fetchUserData } from "../util/api.js";
import RequestError from "../util/RequestError.js";


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
        const discordUserData = await authenticatedPost<DiscordUserData>(`/auth/discord/login?code=${code}&state=${state}`);
        dispatch(login(discordUserData!));
        navigate('/dashboard/guilds');
      } catch (error) {
        if (error instanceof RequestError && (error.code === 401 || error.code === 403)) {
          setAccess(false);
        }
        console.dir(error, { depth: null })
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