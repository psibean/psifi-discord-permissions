import { setMemberRoles, useMemberRoles } from "../../state/simulatedServer.slice";
import { useSelectedGuildId, useSelectedGuildRoles } from "../../state/selectedGuild.slice";
import { useCallback, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import RoleSearch from "./edit/EditRoles";
import MemberRoles from "./roles/MemberRoles";

export default () => {
  const guildId = useSelectedGuildId();

  const [isSearching, setSearching] = useState(false);

  const handleEdit = useCallback(() => setSearching(true), []);
  const handleSearchClose = useCallback(() => setSearching(false), []);
  
  return  (
  <div id="simulated-member-roles" className="flex flex-col w-52 relative my-4 mx-4 scrollbar-base">
    <div className="flex flex-row text-sm justify-between mb-1 pl-2">
      { isSearching ? 
        <span className="cursor-pointer grow max-w-full hover:text-slate-900 dark:hover:text-slate-300" onClick={handleSearchClose}>&lt; Edit Roles</span>
        : 
        <span>Current Roles</span>
      }
    </div>
    <div className="flex flex-col w-full h-52 rounded-md box-border scrollbar-base border border-slate-100 dark:border-slate-800 dark:bg-slate-900">
      {
        isSearching ? <RoleSearch id="role-member-search-new" guildId={guildId} onClose={handleSearchClose} /> : <MemberRoles onEdit={handleEdit} />
      }
    </div>
  </div>
  )
}