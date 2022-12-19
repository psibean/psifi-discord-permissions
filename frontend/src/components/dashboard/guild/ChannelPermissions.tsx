import { hasPermission, PsifiPermission } from "../../../permissions/shared";
import { SelectedGuildChannel } from "../../../../../psd-types/src/types"
import ChannelPermission from "./ChannelPermission";
import { useCalculatedMemberPermissionsForChannel } from "../../../state/simulatedServer.slice";
import ChannelIcon from "./ChannelIcon";
import { BaseSimulatorPageBody, BaseSimulatorPageContainer, BaseSimulatorPageHeader } from "./BaseSimulatorPage";
import { PermissionFlagsBits } from "discord-api-types/v10";
import { useMemo } from "react";
import Paragraph from "../../common/Paragraph";

export type ChannelPermissionsProps = {
  channel: SelectedGuildChannel;
  permissions: PsifiPermission[];
}

const AdministratorPermissionWarning = () => {
  return (
    <div className="bg-orange-400">
      <Paragraph className="text-center text-black font-medium">Warning: One of the roles you have selected has the Administrator permission, this is the same as having all permissions.</Paragraph>
    </div>
  )
}

export default ({ channel, permissions }: ChannelPermissionsProps) => {
  const memberChannelPermissions = useCalculatedMemberPermissionsForChannel(channel.id);
  const hasAdmin = useMemo(
    () => hasPermission(PermissionFlagsBits.Administrator, memberChannelPermissions), 
    [memberChannelPermissions]
  );

  return (<BaseSimulatorPageContainer>
    <BaseSimulatorPageHeader>
      Permissions for <ChannelIcon className="inline-block h-8 w-8 mr-1" type={channel.type} />{ channel.name }
    </BaseSimulatorPageHeader>
    { hasAdmin && <AdministratorPermissionWarning /> }
    <BaseSimulatorPageBody>
      {
        permissions.map(permission => <ChannelPermission key={`${channel.id}-channel-permission-${permission.bitfield}}`} permission={permission} enabled={hasPermission(permission.bitfield, memberChannelPermissions)} />)
      }
    </BaseSimulatorPageBody>
    </BaseSimulatorPageContainer>)
}