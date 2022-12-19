import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useSelectedGuild } from "../../state/selectedGuild.slice";
import { fetchGuild } from "../../util/api";
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
import { CLIENT_ROUTES } from "../../util/constants";
import ChannelItem from "../../components/dashboard/guild/ChannelItem";
import RequestError from "../../util/RequestError";
import { useListedGuilds } from "../../state/user.slice";
import { BiHelpCircle } from "react-icons/bi";

type CategoryChannelMap = {
  [k: string]: SelectedGuildCategory;
}

export default () => {
  const {
    guildId
  } = useParams();

  const selectedGuild = useSelectedGuild();
  const selectedChannel = useSelectedChannel();
  const listedGuilds = useListedGuilds();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isLoading, setLoading] = useState(true);
  const [categoryChannels, setCategoryChannels] = useState(null as (SelectedGuildCategory | SelectedGuildChannel)[] | null);
  const [availablePermissions, setAvailablePermissions] = useState(null as PsifiPermission[] | null);
  const [isHelpOpen, setHelpOpen] = useState(true);

  const handleHelpClick = useCallback(() => {
    setHelpOpen(!isHelpOpen);
  }, [isHelpOpen])

  const availablePermissionsHandler = useMemo(() => (channel: SelectedGuildChannel) => {
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
  }, [])

  const handleChannelClick = useCallback((channel: SelectedGuildChannel) => {
    availablePermissionsHandler(channel);
    dispatch(selectChannel(channel));
    if (isHelpOpen)
      setHelpOpen(false);
  }, [])
  
  useEffect(() => {
    if (selectedChannel.channel !== null) {
      selectChannel(null);
    }
  }, [])

  useEffect(() => {
    if (isLoading) {
      const loadGuild = async () => {
        try {
          await fetchGuild(guildId!, dispatch);
          setLoading(false);
        } catch(error) {
          if (error instanceof RequestError) {
            switch (error.code) {
              case 401:
                navigate(CLIENT_ROUTES.ROOT, { relative: 'path' });
                break;
              case 403:
                navigate(`${CLIENT_ROUTES.DASHBOARD.ROOT}/${CLIENT_ROUTES.DASHBOARD.GUILDS}`, { relative: 'path' });
                break;
            }
          }
        }
      }

      loadGuild();
    }

    if (selectedChannel.channel !== null && availablePermissions === null) {
      availablePermissionsHandler(selectedChannel.channel);
    }
    
    if (!isLoading && selectedGuild.guild !== null) {
      const channelList = Object.values(selectedGuild.channels);
      const categoryChannelMap: CategoryChannelMap = {};
      const categories = channelList.filter(channel => channel.type === ChannelType.GuildCategory || channel.parent === null);
      const rootChannelList = [] as (SelectedGuildCategory | SelectedGuildChannel)[];

      categories.forEach(rootChannel => { 
        if (rootChannel.type === ChannelType.GuildCategory) {
          const categoryChannel = { ...rootChannel, children: [] };
          categoryChannelMap[rootChannel.id] = categoryChannel;
          rootChannelList.push(categoryChannel);
        } else {
          rootChannelList.push(rootChannel)
        } 
      });

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

      setCategoryChannels(rootChannelList.sort((a, b) => { 
        if (a.type !== ChannelType.GuildCategory && b.type === ChannelType.GuildCategory) {
          return -1;
        } else if (a.type === ChannelType.GuildCategory && b.type !== ChannelType.GuildCategory) {
          return 1;
        }
        return a.rawPosition! - b.rawPosition! 
      }));
      setLoading(false);
    }
  }, [selectedGuild, availablePermissions, isLoading])

  if (isLoading || (selectedChannel.channel !== null && availablePermissions === null)) return <Loading text="Loading guild..." />

  if (!isLoading && selectedGuild.guild === null) {
    navigate(CLIENT_ROUTES.DASHBOARD.GUILDS);
  }

  return (
    <div className="relative select-none flex flex-col flex-grow w-4/5 items-center overflow-y-auto px-4 pt-2">
      <div className="relative h-full w-full my-4 flex flex-row">
        <div className="w-80 p-4 h-full box-border border border-slate-300 dark:border-slate-700 scrollbar-base overflow-y-auto overflow-x-hidden box-border border-r border-slate-300 dark:border-slate-700">
        {
          (categoryChannels ?? []).map((rootChannel) => rootChannel.type === ChannelType.GuildCategory ? <CategoryDisplay key={`${rootChannel.id}-category-display`} category={rootChannel} onChannelClick={handleChannelClick} /> : <ChannelItem key={`${rootChannel.id}-channel-display`}  channel={rootChannel} onClick={handleChannelClick} />)
        }
        </div>
        <div className="relative w-full h-full overflow-hidden box-border border-t border-b border-r border-slate-300 dark:border-slate-700">
          { selectedChannel.channel !== null && <BiHelpCircle onClick={handleHelpClick} className="absolute h-8 w-8 top-4 -mt-1 right-4 cursor-pointer text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300" /> }
          { selectedChannel.channel === null || isHelpOpen ? <PermissionSimulatorHelp /> : <ChannelPermissions channel={selectedChannel.channel} permissions={availablePermissions!} /> }
        </div>
      </div>
    </div>
  )
}