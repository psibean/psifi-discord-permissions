import classNames from "classnames";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { CgCheckO } from "react-icons/cg";

export type RoleSearchFilter = boolean | null;
export type RoleSearchFilterEventHandler = (filter: RoleSearchFilter) => void;

export type RoleSearchProps = {
  onFilter: RoleSearchFilterEventHandler;
  filter: RoleSearchFilter;
  onChange: (value: string) => void;
}

export default ({ filter, onFilter, onChange }: RoleSearchProps) => {

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    onChange(event.target.value.toLowerCase());
  }

  const handleFilter = () => {
    if (filter === null) {
      onFilter(true);
    } else if (filter !== null && !filter) {
      onFilter(null);
    } else {
      onFilter(false);
    }
  }

  return (
    <div
      className={classNames(
        "flex group flex-row w-full py-2 justify-between items-center align-center box-border border-t border-slate-100 dark:border-slate-800 h-12 p-2 w-full",
        "focus:text-slate-900 focus:dark:text-slate-300",
        "border-slate-100 hover:text-slate-900",
        "text-slate-700 dark:text-slate-400 dark:hover:text-slate-300")}
      >
      <input type="search" className="mr-2 bg-transparent w-40 focus:outline-none" onChange={handleChange} placeholder="Search..." />
      <CgCheckO
        className={classNames(
          "w-6 h-6 cursor-pointer border-box",
          filter && "text-green-400",
          filter !== null && !filter && "text-red-400"
          )}
        onClick={handleFilter}
      />
    </div>
  );
}