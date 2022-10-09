import { CalcuclatedMemberPermissions, SimulatedChannel } from "../../state/simulatedServer.slice";
import { PsifiPermisssion } from "../../permissions/shared";
import ChannelRow from "./ChannelRow";

export type PermissionsTableProps = { 
  permissions: PsifiPermisssion[];
  channels: SimulatedChannel[];
  calculatedPermissions: CalcuclatedMemberPermissions;
}

export default ({ permissions, channels, calculatedPermissions }: PermissionsTableProps) => {

  return (<div className="m-auto min-h-content">
    <table className="border-collapse my-4 table-fixed text-sm">
      <thead>
        <tr>
          <th />
          {permissions.map(permission => <th key={permission.name} className="border-b dark:border-slate-600 font-medium w-28 p-2 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">{permission.name}</th>)}
        </tr>
      </thead>
      <tbody>
          {
            channels.map((channel) => <ChannelRow key={channel.id} id={channel.id} name={channel.name} channelPermissions={permissions} calculatedMemberPermissions={calculatedPermissions} />)
          }
      </tbody>
    </table>
  </div>)
}