import { MouseEvent as ReactMouseEvent} from 'react';
import { PsifiPermisssion } from "../../permissions/shared";
import { CalcuclatedMemberPermissions, SimulatedChannel } from "../../state/simulatedServer.slice";
import { PermissionFlagsBits } from "discord-api-types/v10";
import { CgCheckO, CgCloseO } from "react-icons/cg";
import { useLinkClickHandler } from "react-router-dom";

type ChannelRowProps = {
  id: string;
  name: string;
  channelPermissions: PsifiPermisssion[];
  calculatedMemberPermissions: CalcuclatedMemberPermissions;
}

export default ({ id, name, channelPermissions, calculatedMemberPermissions }: ChannelRowProps) => {

  const internalClick = useLinkClickHandler<HTMLTableRowElement>(`${id}/overwrites`, {
    relative: 'path'
  })

  const handleRowClick = (event: ReactMouseEvent<HTMLTableRowElement, MouseEvent>) => {
    event.preventDefault();
    if (!event.currentTarget) return;

    // internalClick(event);
  }

  return (
    <tr data-channel_id={id} onClick={handleRowClick}>
      <td className="border border-slate-300 font-medium dark:border-slate-700 min-w-[80px] max-w-[120px] w-28 p-2 text-slate-500 dark:text-slate-400">{name}</td>
      { 
        channelPermissions.map(channelPermission => {
          const calculatedChannelPermissions = BigInt(calculatedMemberPermissions[id]);
          const hasAdmin = (calculatedChannelPermissions & PermissionFlagsBits.Administrator) === PermissionFlagsBits.Administrator;
          const hasPermission = (calculatedChannelPermissions & channelPermission.bitfield) === channelPermission.bitfield;
          return (
            <td key={`${id}-${channelPermission.name}`} className="justify-center border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400">
              {
                hasAdmin || hasPermission ? <CgCheckO className="block m-auto w-5 h-5 text-green-400" /> : <CgCloseO className="block m-auto w-5 h-5 text-red-400" /> 
              }
            </td>)
        })
      }
    </tr>)
}
        