import { useState } from "react";
import Loading from "../../components/util/Loading";
import { useParams } from "react-router-dom";
import { textChannelPermissions } from "../../permissions/textChannelPermissions";
import { useSimulatedServer } from "../../state/simulatedServer.slice";
import BasePage from "../BasePage";
import { ChannelType } from "discord-api-types/v10";
import PermissionsTable from "../..//components/table/PermissionsTable";

export default () => {
  const { guildId } = useParams();
  const simulatedServer = useSimulatedServer();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading)
    return <Loading text="Loading channels..." />

  return (
    <BasePage title="Channel Permissions">
      <PermissionsTable 
        permissions={textChannelPermissions} 
        channels={ Object.entries(simulatedServer.channels).filter(([id, channel]) => channel.type === ChannelType.GuildText).map(([id, channel]) => channel)}
        calculatedPermissions={simulatedServer.member.calculatedPermissions}
      />
    </BasePage>
  )
}