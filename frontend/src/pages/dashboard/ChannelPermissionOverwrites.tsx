import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSimulatedChannel } from "../../state/simulatedServer.slice";
import BasePage from "../BasePage";
import { textChannelPermissions } from "../../permissions/textChannelPermissions";
import OverwriteToggle from "../../components/permissions/OverwriteToggle";
import { useSelectedGuildId } from "../../state/selectedGuild.slice";
import { CLIENT_ROUTES } from "../../util/constants";

type ChannelParams = {
  guildId: string;
  channelId: string;
}

export default () => {
  const navigate = useNavigate();
  const guildId = useSelectedGuildId();
  const { channelId } = useParams() as ChannelParams;
  const dispatch = useDispatch();
  const simulatedChannel = useSimulatedChannel(channelId);

  if (!simulatedChannel && !guildId)
    navigate(CLIENT_ROUTES.DASHBOARD.GUILDS);

  if (!simulatedChannel)
    navigate(`/dashboard/guilds/${guildId}/channels`);

  return <BasePage title={`Permission Overwrites for #${simulatedChannel!.name}`}>
    { textChannelPermissions.map(textChannelPermission => (
      <div key={textChannelPermission.name} className="w-3/5 flex flex-row">
        <div>
          <div><h3>{textChannelPermission.name}</h3></div>
          <div>{textChannelPermission.description}</div>
        </div>
        <div>
        {/* <OverwriteToggle permissionOverwrite={simulatedChannel!.overwrites} /> */}
        </div>
      </div>
    )) }
    </BasePage>
  
}