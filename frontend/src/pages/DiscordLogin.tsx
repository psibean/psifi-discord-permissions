import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/util/Loading.js";
import { authenticatedPost, fetchUserData } from "../util/api.js";

export default () => {
  const [ searchParams ] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    authenticatedPost(`/auth/discord/login?code=${code}&state=${state}`).then(async response => {
      if (response.status === 200) {
        fetchUserData(dispatch).then(() => {
          navigate('/dashboard/guilds');
        });
      }
    }).catch(error => {
      // handle error
      console.log(error);
    })
  }, [])

  return <Loading text="Processing login..." />
}