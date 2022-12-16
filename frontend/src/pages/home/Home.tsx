import { SiDiscord } from "react-icons/si"
import { PSD_API_URL } from "../../util/constants"

export default () => {
  return (
    <>
            <div className="w-full text-center mb-8">
        <h1 className="text-4xl md:text-2xl mb-2 lg:text-4xl pt-4">Ever wonder what access your members have?</h1>
        <h2 className="text-4xl md:text-xl mb-4 lg:text-2xl pt-1">Wonder no more!</h2>
        <p>
          Easily visualize the permissions of your Discord server, any combination of roles!
        </p>
      </div>
      <div className="text-center w-full">
        <a href={`${PSD_API_URL}/auth/discord/login`}>
          <SiDiscord className="inline w-20 h-20" /><br />
          Discord Login
        </a>
      </div>
    </>
  )
}