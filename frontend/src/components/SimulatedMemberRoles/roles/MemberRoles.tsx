import { setMemberRoles, useMemberRoles } from "../../../state/simulatedServer.slice";
import { useSelectedGuildId, useSelectedGuildRoles } from "../../../state/selectedGuild.slice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import MemberRoleItem from "./MemberRoleItem";
import { CgPen } from "react-icons/cg";

export type MemberRolesProps = {
  onEdit: () => void;
}

export default ({ onEdit }: MemberRolesProps) => {
  const guildId = useSelectedGuildId();
  const roles = useSelectedGuildRoles();
  const memberRoles = useMemberRoles();
  const dispatch = useDispatch();
  
  const handleRoleClicked = useCallback((clickedRole: string) => () => {
    if (clickedRole === guildId) {
      dispatch(setMemberRoles([guildId]));
    } else if (memberRoles.includes(clickedRole)) {
        dispatch(setMemberRoles(memberRoles.filter(memberRole => memberRole !== clickedRole)));
    }
  }, [memberRoles]);
  
  return  (
  <>
        <div className="flex flex-col overflow-y-auto scrollbar-base h-52 w-full">
          { memberRoles.map(role => <MemberRoleItem key={`selected-role-${role}`} onClick={handleRoleClicked(role)} role={roles[role]} />) }
        </div>

          <div 
            className="flex justify-center align-center cursor-pointer box-border border-t border-slate-100 dark:border-slate-800 hover:border hover:border-slate-400 dark:hover:border-slate-500 grow py-2 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300" 
            onClick={onEdit}
          >
            <span >
            <CgPen className="inline-block mr-2" />
            Edit roles
            </span>
          </div>
  </>
  )
}