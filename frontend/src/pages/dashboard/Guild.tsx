import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useSelectedGuild } from "../../state/selectedGuild.slice";
import { fetchNewGuild } from "../../util/api";
import { useDispatch } from "react-redux";
import { serverPermissions } from "../../permissions/serverPermissions";
import { CgCheckO, CgCloseO } from 'react-icons/cg';
import BasePage from "../BasePage";
import Loading from "../../components/util/Loading";
import { SelectedGuildCategory, SelectedGuildChannel, SelectedGuildChannels } from "../../../../psd-types/src/types";
import { ChannelType } from "discord-api-types/v10";
import CategoryDisplay from "../../components/dashboard/guild/CategoryDisplay";
import PermissionSimulatorHelp from "../../components/dashboard/guild/PermissionSimulatorHelp";
import ChannelPermissions from "../../components/dashboard/guild/ChannelPermissions";
import { PsifiPermisssion } from "../../permissions/shared";
import { textChannelPermissions } from "../../permissions/textChannelPermissions";
import { voiceChannelPermissions } from "../../permissions/voiceChannelPermissions";

type CategoryChannelMap = {
  [k: string]: SelectedGuildCategory;
}

export default () => {
  const {
    guildId
  } = useParams();
  const selectedGuild = useSelectedGuild();
  const dispatch = useDispatch();
  
  const [isLoading, setLoading] = useState(true);
  const [permissionRows, setPermissionRows] = useState([] as JSX.Element[]);
  const [categoryChannels, setCategoryChannels] = useState(null as CategoryChannelMap | null)
  const [selectedChannel, setSelectedChannel] = useState(null as SelectedGuildChannel | null);
  const [availableCHannelPermissions, setAvailableChannelPermissions] = useState(null as PsifiPermisssion[] | null)

  

  const handleChannelClick = useCallback((channel: SelectedGuildChannel) => {
    setSelectedChannel(channel);
    switch (channel.type) {
      case ChannelType.GuildText:
        setAvailableChannelPermissions(textChannelPermissions);
        break;
      case ChannelType.GuildVoice:
        setAvailableChannelPermissions(voiceChannelPermissions);
        break;
      default:
        setAvailableChannelPermissions(serverPermissions);
        break;
    }
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
          if (a.type === ChannelType.GuildVoice && b.type === ChannelType.GuildText) {
            return 1;
          } else if (a.type === ChannelType.GuildText && b.type === ChannelType.GuildVoice) {
            return -1;
          }

          return a.position! - b.position!
        } ) 
      })

      setCategoryChannels(categoryChannelMap);
      console.log(categoryChannelMap);

      setPermissionRows(Object.values(selectedGuild.roles).map(role => <tr key={role.id} title={role.name} className="hover:bg-white hover:dark:bg-slate-800">
        <td className="border border-slate-300 font-medium dark:border-slate-700 min-w-[80px] max-w-[120px] w-28 p-2 text-slate-500 dark:text-slate-400 " style={{ color: role.color }}>{role.name}</td>
        {  
          serverPermissions.map(serverPermission => {
            return <td key={`${role.id}-${serverPermission.name}`} className="justify-center border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400">
              { serverPermission.has(BigInt(role.permissions)) ? <CgCheckO className="block m-auto w-5 h-5 text-green-400" /> : <CgCloseO className="block m-auto w-5 h-5 text-red-400" /> }
            </td>
          }
        )}
        </tr>))
      setLoading(false);
    }
  }, [selectedGuild])

  if (isLoading) return <Loading /> 

  return (
    <div className="flex flex-col flex-grow w-4/5 items-center overflow-y-auto px-4 pt-2">
    <div className="h-full w-full my-4 flex flex-row">
      <div className="w-60 p-4 h-full box-border border border-slate-300 dark:border-slate-700 scrollbar-base overflow-y-auto overflow-x-hidden box-border border-r border-slate-300 dark:border-slate-700">
      {
        Object.entries(categoryChannels ?? {}).map(channelEntry => <CategoryDisplay category={channelEntry[1]} onChannelClick={handleChannelClick} />)
      }
      </div>
      <div className="w-full h-full overflow-y-auto scrollbar-base overflow-x-hidden box-border border-t border-b border-r border-slate-300 dark:border-slate-700">
        { selectedChannel === null ? <PermissionSimulatorHelp /> : <ChannelPermissions permissions={availableCHannelPermissions!} channel={selectedChannel} /> }
      </div>
    </div>
    </div>
  )

  return (<BasePage title="Server Permissions">
    <div className="m-auto min-h-content">
      <table className="border-collapse my-4 table-fixed text-sm">
        <thead>
          <tr>
            <th />
            {serverPermissions.map(serverPermission => <th key={serverPermission.name} className="border-b dark:border-slate-600 font-medium w-28 p-2 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">{serverPermission.name}</th>)}
          </tr>
        </thead>
        <tbody>
          { permissionRows }
        </tbody>
      </table>
    </div>
  </BasePage>)
}