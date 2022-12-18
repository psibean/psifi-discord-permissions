import { SiDiscord } from "react-icons/si"
import Anchor from "../../components/common/Anchor"
import HeaderOne from "../../components/common/HeaderOne"
import HeaderTwo from "../../components/common/HeaderTwo"
import ListItem from "../../components/common/ListItem"
import Paragraph from "../../components/common/Paragraph"
import UnorderedList from "../../components/common/UnorderedList"
import { PSD_API_URL } from "../../util/constants"

export default () => {
  return (
    <>
        <div className="w-full mb-8">
        <HeaderOne>Ever wonder what access your members have?</HeaderOne>
        <HeaderTwo>Wonder no more!</HeaderTwo>
        <Paragraph>
          Easily simulate and visualize the permissions of your Discord server, any combination of roles!
        </Paragraph>
        <Paragraph>
          <span className="font-bold">Psifi Bot is currently in experimental beta, bugs and issues should be expected.</span>
        </Paragraph>
        <Paragraph>
          Please report any potential bugs or problems via the <Anchor href="https://psifisolutions.com/discord">Psifi Solutions Discord Server</Anchor>, or directly to Psi#2741.
        </Paragraph>
      </div>
        <a className="text-center block text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300" href={`${PSD_API_URL}/auth/discord/login`}>
          <SiDiscord className="inline w-20 h-20" /><br />
          Discord Login
        </a>
        <Paragraph>
          By logging in, or inviting Psifi Bot to your server, you agree to the Terms of Service and Privacy Policy.
        </Paragraph>
        <Paragraph>
          Psifi Bot will be undergoing constant updates and improvements, some of the longer term plans include:
        </Paragraph>
        <UnorderedList>
          <ListItem>
            Better UI theme and colours, with a light, dark, and pastel mode!
          </ListItem>
          <ListItem>
            The ability to simulate changes to your channel overrides to see how such changes may impact your permissions overall.
          </ListItem>
          <ListItem>
            The ability to, in addition to the previous point, save the changes you make directly to your server.
          </ListItem>
        </UnorderedList>
    </>
  )
}