import { Link } from "react-router-dom";
import { ListedGuild } from "../../../../../psd-types/src/types";
import BaseGuildCard from './BaseGuildCard';

export type SelectGuildCardProps = {
  guild: ListedGuild;
}

export default ({ guild }: SelectGuildCardProps) => {

  return (
    <BaseGuildCard guild={guild}>
      <Link to={`/dashboard/guilds/${guild.id}`}>
        <button className="px-4 py-2 font-semibold text-lg bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-sm">
          Select
        </button>
      </Link>
    </BaseGuildCard>
  )
}