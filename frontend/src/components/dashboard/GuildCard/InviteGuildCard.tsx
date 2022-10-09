import type { MouseEvent } from 'react';
import { ListedGuild } from "../../../../../psd-types/src/types";
import BaseGuildCard from './BaseGuildCard';

export type SelectGuildCardProps = {
  guild: ListedGuild;
  inviteHandler: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default ({ guild, inviteHandler }: SelectGuildCardProps) => {

  return (  
    <BaseGuildCard guild={guild}>
      <button
        data-guild_id={guild.id}
        onClick={inviteHandler}
        className="px-4 py-2 font-semibold text-lg bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-sm"
      >
        Invite
      </button>
    </BaseGuildCard>
  )
}