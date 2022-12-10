import { hasPermission, PsifiPermission } from "../../../permissions/shared";
import { SelectedGuildChannel } from "../../../../../psd-types/src/types"
import ChannelPermission from "./ChannelPermission";
import { useCalculatedMemberPermissionsForChannel } from "../../../state/simulatedServer.slice";
import ChannelIcon from "./ChannelIcon";
import { BaseSimulatorPageBody, BaseSimulatorPageContainer, BaseSimulatorPageHeader } from "./BaseSimulatorPage";

export type ChannelPermissionsProps = {
  channel: SelectedGuildChannel;
  permissions: PsifiPermission[];
}

export default ({ channel, permissions }: ChannelPermissionsProps) => {
  const memberChannelPermissions = useCalculatedMemberPermissionsForChannel(channel.id);
  
  return (<BaseSimulatorPageContainer>
    <BaseSimulatorPageHeader>
      Permissions for  <ChannelIcon className="inline-block h-8 w-8 mr-1" type={channel.type} />{ channel.name }
    </BaseSimulatorPageHeader>
    <BaseSimulatorPageBody>
      {
        permissions.map(permission => <ChannelPermission key={`${channel.id}-channel-permission-${permission.bitfield}}`} permission={permission} enabled={hasPermission(permission.bitfield, BigInt(memberChannelPermissions))} />)
      }
    </BaseSimulatorPageBody>
    </BaseSimulatorPageContainer>)
}