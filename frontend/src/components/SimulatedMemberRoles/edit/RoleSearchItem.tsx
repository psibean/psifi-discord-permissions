import { RoleSearchItemProps } from "../types"
import { CgCloseO, CgCheck } from "react-icons/cg"

export default ({ role, selected, onClick }: RoleSearchItemProps) => {
  return (
    <div 
      className="flex flex-row w-full box-border h-min justify-between align-center cursor-pointer px-4 p-2 border-slate-100 dark:border-slate-800 border-t hover:bg-white hover:dark:bg-slate-800"
      style={{ color: role.color }}
      onClick={onClick}
      title={`${selected ? "Remove" : "Add"} ${role.name}`}
    >
        <div className="w-full max-w-full h-6 box-border overflow-hidden text-ellipsis text-sm h-6 whitespace-nowrap">
          {role.name}
          </div>
          { selected && <CgCheck className="h-6 w-6 text-green-400 inline-block" />}
    </div>
  )
}