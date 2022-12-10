import { ChannelType } from "discord-api-types/v10";
import { useCallback } from "react";
import { CgHashtag, CgMic, CgVolume } from "react-icons/cg";
import { useSelectedChannel } from "../../../state/selectedChannel.slice";
import { SelectedGuildChannel } from "../../../../../psd-types/src/types"
import ChannelIcon from "./ChannelIcon";
import classNames from "classnames";


export type ChannelItemProps = {
  channel: SelectedGuildChannel;
  onClick: (channelId: SelectedGuildChannel) => void;
}

export default ({ channel, onClick }: ChannelItemProps) => {
  const selectedChannel = useSelectedChannel();

  const handleClick = useCallback(() => {
    onClick(channel);
  }, [channel])

  return (<div 
    className={classNames(
      "flex flex-row w-full align-center items-center cursor-pointer pl-4 mb-1 py-1 text-slate-700 hover:text-slate-900 rounded-sm dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-800",
      selectedChannel.channel?.id === channel.id && "bg-slate-800"
    )}
    onClick={handleClick}  
  >
    <ChannelIcon className="mr-2 h-6 w-6" type={channel.type} />
    <div
      className={
        classNames(
          "text-ellipsis whitespace-nowrap text-lg overflow-hidden",
          selectedChannel.channel?.id === channel.id && "text-white"
        )}
        title={channel.name}>
          { channel.name }
    </div>
  </div>)
}