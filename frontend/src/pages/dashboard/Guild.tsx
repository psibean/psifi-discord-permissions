import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useSelectedGuild } from "../../state/selectedGuild.slice";
import { fetchNewGuild } from "../../util/api";
import { useDispatch } from "react-redux";
import { serverPermissions } from "../../permissions/serverPermissions";
import Loading from "../../components/util/Loading";
import { SelectedGuildCategory, SelectedGuildChannel } from "../../../../psd-types/src/types";
import { ChannelType } from "discord-api-types/v10";
import CategoryDisplay from "../../components/dashboard/guild/CategoryDisplay";
import PermissionSimulatorHelp from "../../components/dashboard/guild/PermissionSimulatorHelp";
import ChannelPermissions from "../../components/dashboard/guild/ChannelPermissions";
import { PsifiPermission } from "../../permissions/shared";
import { textChannelPermissions } from "../../permissions/textChannelPermissions";
import { voiceChannelPermissions } from "../../permissions/voiceChannelPermissions";
import { selectChannel, useSelectedChannel } from "../../state/selectedChannel.slice";

type CategoryChannelMap = {
  [k: string]: SelectedGuildCategory;
}

export default () => {
  const {
    guildId
  } = useParams();

  const selectedGuild = useSelectedGuild();
  const selectedChannel = useSelectedChannel();
  const dispatch = useDispatch();
  
  const [isLoading, setLoading] = useState(true);
  const [categoryChannels, setCategoryChannels] = useState(null as CategoryChannelMap | null);
  const [availablePermissions, setAvailablePermissions] = useState(null as PsifiPermission[] | null);

  const handleChannelClick = useCallback((channel: SelectedGuildChannel) => {
    switch (channel.type) {
      case ChannelType.GuildText:
        setAvailablePermissions(textChannelPermissions);
        break;
      case ChannelType.GuildVoice:
        setAvailablePermissions(voiceChannelPermissions);
        break;
      default:
        setAvailablePermissions(serverPermissions);
    }
    dispatch(selectChannel(channel));
  }, [])
  
  useEffect(() => {
    console.log("USE");
    if (selectedGuild.guild === null && guildId) {
      fetchNewGuild(guildId, dispatch)
        .catch(error => {
          console.log(error);
        });
    }

    if (selectedGuild.guild !== null) {
      const channelList = Object.values(selectedGuild.channels);
      const categoryChannelMap: CategoryChannelMap = {};
      const categories = Object.values(selectedGuild.channels).filter(channel => channel.type === ChannelType.GuildCategory);

      console.log(categories);
      categories.forEach(category => categoryChannelMap[category.id] = { ...category, children: [] });

      channelList.forEach(channel => {
        if (channel.type !== ChannelType.GuildCategory && channel.parent !== null) {
          categoryChannelMap[channel.parent].children.push(channel);
        }
      })

      Object.values(categoryChannelMap).forEach(categoryChannelMapping => {
        categoryChannelMapping.children.sort((a, b) => {
          if ((a.type === ChannelType.GuildVoice || a.type === ChannelType.GuildStageVoice) && b.type === ChannelType.GuildText) {
            return 1;
          } else if (a.type === ChannelType.GuildText && (b.type === ChannelType.GuildVoice || b.type === ChannelType.GuildStageVoice)) {
            return -1;
          }

          return a.position! - b.position!
        } ) 
      })

      setCategoryChannels(categoryChannelMap);
      console.log(categoryChannelMap);
      setLoading(false);
    }
  }, [selectedGuild])

  if (isLoading) return <Loading /> 

  return (
    <div className="flex flex-col flex-grow w-4/5 items-center overflow-y-auto px-4 pt-2">
    <div className="h-full w-full my-4 flex flex-row">
      <div className="w-80 p-4 h-full box-border border border-slate-300 dark:border-slate-700 scrollbar-base overflow-y-auto overflow-x-hidden box-border border-r border-slate-300 dark:border-slate-700">
      {
        Object.entries(categoryChannels ?? {}).sort((a, b) => a[1].position! - b[1].position!  ).map(([_, category]) => <CategoryDisplay key={`${category.id}-category-display`} category={category} onChannelClick={handleChannelClick} />)
      }
      </div>
      <div className="w-full h-full overflow-hidden box-border border-t border-b border-r border-slate-300 dark:border-slate-700">
        { selectedChannel.channel === null ? <PermissionSimulatorHelp /> : <ChannelPermissions channel={selectedChannel.channel} permissions={availablePermissions!} /> }
      </div>
    </div>
    </div>
  )
}