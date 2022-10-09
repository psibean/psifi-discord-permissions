import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";

export default () => {
  const [params] = useSearchParams();
  
  useEffect(() => {
    if (window.opener && window.opener.location.origin === window.location.origin) {
      if (params.has('guild_id')) {
        window.opener.postMessage({ guildId: params.get('guild_id') }, window.location.origin);
      } else if (params.has('error')) {
        window.opener.postMessage({ error: params.get('error'), guildId: null }, window.location.origin);
      } else {
        window.opener.postMessage({ error: `Something went wrong with that guild invite...` });
      }
    }
    window.close();
  }, [])

  return (<div>
      <p>
        Processing guild invite....
      </p>
    </div>
  )
}