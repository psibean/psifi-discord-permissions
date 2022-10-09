import { hasPermission, PsifiPermisssion } from "../../../permissions/shared";
import { SelectedGuildChannel } from "../../../../../psd-types/src/types"
import ChannelPermission from "./ChannelPermission";
import { useCalculatedMemberPermissionsForChannel } from "../../../state/simulatedServer.slice";

export type ChannelPermissionsProps = {
  channel: SelectedGuildChannel;
  permissions: PsifiPermisssion[];
}

export default ({ channel, permissions }: ChannelPermissionsProps) => {
  const memberChannelPermissions = useCalculatedMemberPermissionsForChannel(channel.id);
  
  return (<>
    <div className="bg-white dark:bg-slate-900 text-center">
      { channel.name } permissions
    </div>
      {
        permissions.map(permission => <ChannelPermission permission={permission} enabled={hasPermission(permission.bitfield, BigInt(memberChannelPermissions))} />)
      }
    </>)
}