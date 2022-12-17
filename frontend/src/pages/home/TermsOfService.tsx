import { Link } from "react-router-dom"
import Anchor from "../../components/common/Anchor"
import HeaderOne from "../../components/common/HeaderOne"
import HeaderThree from "../../components/common/HeaderThree"
import HeaderTwo from "../../components/common/HeaderTwo"
import LinkAnchor from "../../components/common/LinkAnchor"
import ListItem from "../../components/common/ListItem"
import Paragraph from "../../components/common/Paragraph"
import UnorderedList from "../../components/common/UnorderedList"
import { CLIENT_ROUTES } from "../../util/constants"

export default () => {
  return (
    <>
      <HeaderOne>Terms of Service</HeaderOne>
      <Paragraph>Last updated: 16/12/2022</Paragraph>
      <Paragraph>
        If you have any questions or concerns regarding the Terms of Service, please direct any inquiries to the <Anchor href="https://psifisolutions.com/discord">Psifi Solutions Discord Server</Anchor> or contact Psi#2741.
      </Paragraph>
      <Paragraph>Agreement to and acknowledgement of the Terms of Service commences when:</Paragraph>
      <UnorderedList>
        <ListItem>
          You invite Psifi Bot to a server you own or manage. You agree that you have shared the Terms of Service here with those in your server, as they may be subject to them as well.
        </ListItem>
        <ListItem>
          You login to the Psifi Bot dashboard, or access services provided by Psifi Bot through any other means.
        </ListItem>
      </UnorderedList>
      <Paragraph>
        These Terms of Service act as an extension of <Anchor href="https://discord.com/terms">Discord's Terms of Service</Anchor>, where those Terms of Service superscede those declared here.
      </Paragraph>
      <Paragraph>
        These Terms of Service only apply to the use of the services provided by Psifi Bot, these Terms of Service are not relevant to and do not apply to any other services provided by Psifi Solutions.
      </Paragraph>
      <Paragraph>
        If you do not agree with or intend to comply with the Terms of Service herein, or you do not agree with the <LinkAnchor to={CLIENT_ROUTES.PRIVACY}>Privacy Policy</LinkAnchor>, then you are prohibited from using Psifi Bot and if you have already used Psifi Bot's services you should cease immediately.
      </Paragraph>

      <HeaderTwo>Usage Agreement</HeaderTwo>
      <Paragraph>
        Subject to these Terms of Service you agree to only use Psifi Bot for it's intended purposes of which it is made available and Psifi Solutions provides no guarantee of the availability of Psifi Bot. The permissions simulator provided by Psifi Bot calculates permissions as per <Anchor href="https://discord.com/developers/docs/topics/permissions#permission-overwrites">Discord's permissions documentation</Anchor>. If at any time Discord updates or changes how roles, channel overrides, or any other permission related services operate, there may be a time of discrepency between those updates and Psifi Bot updates, this could cause inaccuracies in the information provided by Psifi Bot. You agree that any actions taken by you in relation to the information and services provided by Psifi Bot are entirely your responsibility and Psifi Solutions is not liable or accountable for any changes you may make to your server(s) or for any damages, side effects, or consequences you may face as a result.
      </Paragraph>
      <HeaderThree>
        Intended Use
      </HeaderThree>
      <Paragraph>
        This section outlines the intended purpose and authorised use of Psifi Bot and may be updated without notice with new or changed features.
      </Paragraph>
      <Paragraph>
        Using or interacting with Psifi Bot in any way or for any other purposes, other than those listed here may be strictly prohibited. If you are caught or suspect of utilising or abusing Psifi Bot for any purposes other than those listed below at the discretion of Psifi Solutions, Psifi Solutions has the right to limit, restrict, or entirely block your access to Psifi Bot.
      </Paragraph>
      
      <UnorderedList>
        <ListItem>
          Simulate a server members roles and permissions for servers you either own or have the Administrator permission for, to help you visualise the access your members may have across the server.
        </ListItem>
      </UnorderedList>
      <HeaderTwo>Intellectual Property Rights</HeaderTwo>
      <Paragraph>
        Unless otherwise indicated, Psifi Bot is the proprietary property of Psifi Solutions and all source code, databases, functionality, software, photographs, and graphics on the Bot (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by or licensed to Psifi Solutions, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. The Content and the Marks are provided on the Bot “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Use, no part of Psifi Bot and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
      </Paragraph>
      <Paragraph>
        Provided that you are eligible to use Psifi Bot, you are granted a limited license to access and use Psifi Bot and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to Psifi Bot, the Content and the Marks.
      </Paragraph>
    </>
  )
}