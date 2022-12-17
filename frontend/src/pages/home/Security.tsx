import Anchor from "../../components/common/Anchor";
import HeaderOne from "../../components/common/HeaderOne";
import HeaderTwo from "../../components/common/HeaderTwo";
import ListItem from "../../components/common/ListItem";
import Paragraph from "../../components/common/Paragraph";
import UnorderedList from "../../components/common/UnorderedList";

export default () => {
  return (
    <>
      <HeaderOne>Security</HeaderOne>
      <Paragraph>
        Psifi Solutions takes security seriously, this page intends to help re-assure you of the security expertise and awareness that goes into the Psifi Bot and site. If you have any questions or concerns regarding the security of Psifi Bot, please direct any inquiries to the <Anchor href="https://psifisolutions.com/discord">Psifi Solutions Discord Server</Anchor> or contact Psi#2741.
      </Paragraph>
      <HeaderTwo>Authentication and Authorization</HeaderTwo>
      <UnorderedList>
        <ListItem>
          Psifi Bot uses Discord OAuth2 via the Authorization Code Grant with PKCE workflow, Psifi Solutions follows the official internet standard for OAuth2 <Anchor href="https://www.rfc-editor.org/rfc/rfc6749">RFC-6748</Anchor>, the extended standards for PKCE <Anchor href="https://www.rfc-editor.org/rfc/rfc7636">RFC-7656</Anchor>, and we follow the internet standard draft for <Anchor href="https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics">OAuth2 Security Best Practices</Anchor>. This is evident as when you access the page to login via Discord, you'll see the state and verifier query parameter in the URL.
        </ListItem>
        <ListItem>
          For sensitive requests Psifi Solutions follows the <Anchor href="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html">OWASP recommended security practices</Anchor> for CSRF protection.
        </ListItem>
        <ListItem>
          Psifi Solutions follows best practices for <Anchor href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html">secure session management</Anchor> and <Anchor href="https://cheatsheetseries.owasp.org/cheatsheets/Key_Management_Cheat_Sheet.html">secure key management</Anchor>.
        </ListItem  >
      </UnorderedList>
      
      <HeaderTwo>Management</HeaderTwo>
      <Paragraph>
        Psifi Solutions takes a variety of security measures to ensure the safe and secure operation of Psifi Bot, including but not limited to:
      </Paragraph>
      <UnorderedList>
        <ListItem>
          Psifi Bot only operates over https.
        </ListItem>
        <ListItem>
          Psifi Bot is executed within a restricted environment, by a user that has minimal system access to the server as is necessary to run Psifi Bot.
        </ListItem>
        <ListItem>
          All systems access is protected, where applicable, by strict and explicit allow lists, cryptograpghically pseudorandom generated passwords, and 2FA.
        </ListItem>
      </UnorderedList>
    </>)
  };