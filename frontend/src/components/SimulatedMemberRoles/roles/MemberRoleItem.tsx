import { CgCloseO } from "react-icons/cg";
import { RoleItemProps } from "../types";

export default ({ role, onClick }: RoleItemProps) => {
  return (
    <div 
      className="flex flex-row group justify-between align-center items-center cursor-pointer px-4 py-2 pb-2 border-slate-100 dark:border-slate-800 border-b hover:bg-white hover:dark:bg-slate-800"
      style={{ color: role.color }}
      onClick={onClick}
      title={`Remove ${role.name}`}
    >
        <div className="w-full overflow-hidden text-ellipsis text-sm h-6 whitespace-nowrap">{role.name}</div>
        <CgCloseO className="h-6 w-6 text-red-400 hidden group-hover:block" />
    </div>
  )
}