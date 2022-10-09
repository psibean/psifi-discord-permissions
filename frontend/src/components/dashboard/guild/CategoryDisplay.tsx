import { ChannelType } from "discord-api-types/v10";
import { useCallback, useMemo, useState } from "react";
import { CgChevronDown, CgChevronRight, CgHashtag, CgVolume } from "react-icons/cg";
import { SelectedGuildCategory, SelectedGuildChannel } from "../../../../../psd-types/src/types"
import ChannelItem from "./ChannelItem";

export type CategoryDisplayProps = {
  category: SelectedGuildCategory;
  onChannelClick: (channel: SelectedGuildChannel) => void;
}

export default ({ category, onChannelClick }: CategoryDisplayProps) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const handleCollapse = useCallback(() => setCollapsed(!isCollapsed), [isCollapsed])

  return (
    <div className="flex flex-col mb-1">
      <div
        className="flex flex-row align-center mb-1 cursor-pointer items-center text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
        onClick={handleCollapse}
      >
        {isCollapsed ? <CgChevronRight /> : <CgChevronDown />}
        <div className="text-ellipsis whitespace-nowrap overflow-hidden" title={category.name}>
          { category.name.toUpperCase() }
        </div>
      </div>
      { !isCollapsed && category.children.map(channel => <ChannelItem channel={channel} onClick={onChannelClick} />) }
    </div>
  )
}