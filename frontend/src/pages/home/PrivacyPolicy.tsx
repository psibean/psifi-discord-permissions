import Anchor from "../../components/common/Anchor"
import HeaderOne from "../../components/common/HeaderOne"
import HeaderTwo from "../../components/common/HeaderTwo"
import ListItem from "../../components/common/ListItem"
import Paragraph from "../../components/common/Paragraph"
import UnorderedList from "../../components/common/UnorderedList"

export default () => {
  return (
    <>
      <HeaderOne>Privacy Policy</HeaderOne>
      <Paragraph>Last updated: 16/12/2022</Paragraph>
      <Paragraph>
        If you have any questions or concerns regarding the Privacy Policy, please direct any inquiries to the <Anchor href="https://psifisolutions.com/discord">Psifi Solutions Discord Server</Anchor> or contact Psi#2741.
      </Paragraph>
      <Paragraph>
        Psifi Bot does not share any of its data with any third-parties and takes appropriate security measures and follows best practices to ensure the security and integrity of any and all data collected and stored. If you do not agree with the policy herein then you are prohibited from using Psifi Bot and if you have already used Psifi Bot's services you should cease immediately.
      </Paragraph>
      <HeaderTwo>Collected Data</HeaderTwo>
      <Paragraph>
        Collected data refers to data that is used but is not saved, stored, or persisted, the data is only used throughout the runtime of the application. Collected data may also be stored data.
      </Paragraph>
      <Paragraph>
        Psifi Bot collects data permitted by you in accordance with the <Anchor href="https://discord.com/developers/docs/policies-and-agreements/developer-terms-of-service#discord-developer-terms-of-service">Discord Developer Terms of Service</Anchor>. The collected data is provided to Psifi Bot by Discord only with your authorizing permission, either by signing in to the Psifi Bot dashboard or by inviting Psifi Bot to your server.
      </Paragraph>
      <Paragraph>
        Collected data, consists of:
      </Paragraph>
      <UnorderedList>
        <ListItem>
          Server information such as the id, name, icon, banner, and permissions of a particular user as <Anchor href="https://discord.com/developers/docs/resources/user#get-current-user-guilds-example-partial-guild">found here</Anchor>.
          This information will only be accessible by server owners, any members with the Administrator permission, and any other members who have been permitted access by the server owner, regardless of whether or not Psifi Bot is in the server.
        </ListItem>
        <ListItem>
          Server information such as the server roles, channel information, other configuration settings as <Anchor href="https://discord.com/developers/docs/resources/guild">found here</Anchor>.
          This information will only be accessible by server owners, any members with the Administrator permission, and any other members who have been permitted access by the server owner, so long as Psifi Bot is a member of the server.
        </ListItem>
        <ListItem>
          Server member information for all members on your server as <Anchor href="https://discord.com/developers/docs/resources/guild#guild-member-object">found here</Anchor>.
        </ListItem>
        <ListItem>
          When logging in to the dashboard, user information relating to the authenticated user such as id, username, descriptor, avatar, banner, and other user specific settings, the servers they are in and their permissions within those servers as <Anchor href="https://discord.com/developers/docs/resources/user#user-object">found here</Anchor>.
        </ListItem>
      </UnorderedList>
      <Paragraph>Collected data is used for the sole purpose of providing you the features and services that Psifi Bot provides.</Paragraph>
      <HeaderTwo>Stored Data</HeaderTwo>
      <Paragraph>
        Currently Psifi Bot does not store or persist any personal information. The only information currently stored is your discord user id, the storage of which only exists until you logout or your login session expires.
      </Paragraph>
      <Paragraph>
        In the future, the data that is stored may change, however no data will ever be stored automatically. New features may be added to Psifi Bot which may require additional data to be stored, data will never be stored without your explicit action and any features requiring data to be stored will be unavailable until you explicitly tell Psifi Bot to save your data. This Privacy Policy may be updated to cover any new data that is stored and the purpose for which it is used, given the nature in which the data is stored, these changes will be effective immediately.
      </Paragraph>
      <Paragraph>
        If and when Psifi Bot does store data for features, the ability to download and delete that data will be provided to you, any deleted data will be completely wiped and unable to be restored or retrieved. This clause will be updated appropriately and effective immediately as required.
      </Paragraph>
      <HeaderTwo>Cookie Policy</HeaderTwo>
      <Paragraph>
        Psifi Bot does not collect or store any personal information via cookies, does not use any third-party cookies, and does not use any tracking or analytical cookies. The only cookies used by Psifi Bot are for the sole purpose of providing authentication security and other functionality of the site, disabling the use of cookies in your browser may prevent the site from working for you.
      </Paragraph>
    </>
  )
}