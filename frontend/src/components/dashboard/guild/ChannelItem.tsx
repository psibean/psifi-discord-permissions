import { ChannelType, PermissionFlagsBits } from "discord-api-types/v10";
import { useCallback, useMemo } from "react";
import { CgHashtag, CgMic, CgVolume } from "react-icons/cg";
import { useSelectedChannel } from "../../../state/selectedChannel.slice";
import { SelectedGuildChannel } from "../../../../../psd-types/src/types"
import ChannelIcon from "./ChannelIcon";
import classNames from "classnames";
import { useCalculatedMemberPermissionsForChannel } from "../../../state/simulatedServer.slice";
import { hasPermission } from "../../../permissions/shared";
import { useSelectedGuildChannel } from "../../../state/selectedGuild.slice";


export type ChannelItemProps = {
  channel: SelectedGuildChannel;
  onClick: (channelId: SelectedGuildChannel) => void;
}

export default ({ channel, onClick }: ChannelItemProps) => {
  const selectedChannel = useSelectedChannel();
  const selectedGuildChannel = useSelectedGuildChannel(channel.id);
  const calculatedChannelPermissions = useCalculatedMemberPermissionsForChannel(selectedGuildChannel.id);
  const locked = 
    (selectedGuildChannel.type === ChannelType.GuildVoice || selectedGuildChannel.type === ChannelType.GuildStageVoice)
    && calculatedChannelPermissions !== undefined
    && !hasPermission(PermissionFlagsBits.Connect, BigInt(calculatedChannelPermissions))

  const isViewable = hasPermission(PermissionFlagsBits.ViewChannel, BigInt(calculatedChannelPermissions));
  

  const handleClick = useCallback(() => {
    if (isViewable)
      onClick(channel);
  }, [channel])

  return (<div 
    className={classNames(
      "flex flex-row w-full group align-center items-center cursor-pointer pl-4 mb-1 py-1 text-slate-700 rounded-sm dark:text-slate-400",
      isViewable ? "cursor-pointer hover:bg-slate-800" : "cursor-not-allowed",
      selectedChannel.channel?.id === channel.id && "bg-slate-800"
    )}
    onClick={handleClick}  
  >
    <ChannelIcon className="mr-2 h-6 w-6" type={channel.type} locked={locked} />
    <div
      className={
        classNames(
          "text-ellipsis whitespace-nowrap text-lg overflow-hidden",
          isViewable && "group-hover:text-slate-900 dark:group-hover:text-slate-300",
          !isViewable && "line-through",  
          selectedChannel.channel?.id === channel.id && "text-white"
        )}
        title={channel.name}>
          { channel.name }
    </div>
  </div>)
}