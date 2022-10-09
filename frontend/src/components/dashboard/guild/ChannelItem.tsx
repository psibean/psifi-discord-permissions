import { ChannelType } from "discord-api-types/v10";
import { useCallback } from "react";
import { CgHashtag, CgVolume } from "react-icons/cg";
import { SelectedGuildChannel } from "../../../../../psd-types/src/types"


export type ChannelItemProps = {
  channel: SelectedGuildChannel;
  onClick: (channelId: SelectedGuildChannel) => void;
}

export default ({ channel, onClick }: ChannelItemProps) => {

  const handleClick = useCallback(() => {
    onClick(channel);
  }, [channel])

  return (<div 
    className="flex flex-row w-full align-center items-center cursor-pointer pl-4 mb-1 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-800"
    onClick={handleClick}  
  >
    { channel.type === ChannelType.GuildVoice ? <CgVolume className="mr-1 h-3 w-3" /> : <CgHashtag /> }
    <div className="text-ellipsis whitespace-nowrap overflow-hidden" title={channel.name}>{ channel.name }</div>
  </div>)
}