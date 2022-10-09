import { PsifiPermisssion } from "../../../permissions/shared"

export type ChannelPermissionProps = {
  permission: PsifiPermisssion;
  enabled: boolean;
}

import classNames from "classnames";
import { PropsWithChildren } from "react";
import { CgCheck, CgClose } from "react-icons/cg";

type OverwriteStatusProps = PropsWithChildren<{
  backgrounColourClass: string;
  className?: string;
  enabled: boolean;
}>;

const PermissionStatusDisplay = ({ children, className, backgrounColourClass, enabled }: OverwriteStatusProps) => (
  <div className={classNames(
    "flex items-center justify-center align-center w-8 h-8 border-t border-b border-slate-100 dark:border-slate-700",
    className,
    enabled && backgrounColourClass
  )}>
      { children }
  </div>
)

type PermissionStatusProps = {
  enabled: boolean;
}

const PermissionStatus = ({ enabled }: PermissionStatusProps) => {
  return (<div className="flex flex-row">
    <PermissionStatusDisplay className="border-l rounded-l-md" backgrounColourClass="bg-red-500" enabled={!enabled}>
        <CgClose className="w-4 h-4" />
    </PermissionStatusDisplay>
    <PermissionStatusDisplay className="border-r rounded-r-md" backgrounColourClass="bg-green-500" enabled={enabled}>
      <CgCheck className="w-4 h-4" />
    </PermissionStatusDisplay>
  </div>)
}

export default ({ permission, enabled}: ChannelPermissionProps) => {
  return (<div className="m-auto max-w-4xl box-border flex flex-row justify-between pb-4 mx-4 first:mt-0 mt-4 border-b border-slate-300 dark:border-slate-700">
      <div className="flex flex-col">
        <div className="font-bold text-lg">{ permission.name }</div>
        <div>{ permission.description }</div>
      </div>
      <div className="flex items-center align-center ml-4">
        <PermissionStatus enabled={enabled} />
      </div>
    </div> )
}