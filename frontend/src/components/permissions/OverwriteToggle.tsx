import classNames from "classnames";
import { PropsWithChildren } from "react";
import { CgCheckO, CgCloseO, CgFormatSlash } from "react-icons/cg";
import { PsifiPermission } from "../../permissions/shared";
import { ChannelPermissionOverwrite } from "../../../../psd-types/src/types";

type OverWriteStatus = "allow" | "deny" | "" 

type OverwriteStatusProps = PropsWithChildren<{
  enabled: boolean;
  className?: string;
}>;

const OverwriteStatusDisplay = ({ className, enabled, children }: OverwriteStatusProps) => (
  <div className={classNames(
    "flex items-center justify-center w-12 h-12 border border-slate-400 dark:border-slate-500",
    className
  )}>
      { children }
  </div>
)

type OverWriteToggleProps = {
  permission: PsifiPermission;
  permissionOverwrite: ChannelPermissionOverwrite;
}

export default ({ permission, permissionOverwrite }: OverWriteToggleProps) => {
  const permissionBitfield = permission.bitfield.toString();
  const handleToggleClick = (overWriteState: OverWriteStatus) => {

  }
  return (<div className="flex flex-row">
    <OverwriteStatusDisplay enabled={permissionOverwrite.allows === "0" && permissionOverwrite.denies == permissionBitfield}>
        <CgCloseO className="w-6 h-6" />
    </OverwriteStatusDisplay>
    <OverwriteStatusDisplay enabled={permissionOverwrite.allows === "0" && permissionOverwrite.denies == "0"}>
      <CgFormatSlash className="w-6 h-6" />
    </OverwriteStatusDisplay>
    <OverwriteStatusDisplay enabled={permissionOverwrite.denies === "0" && permissionOverwrite.allows === permissionBitfield}>
      <CgCheckO className="w-6 h-6" />
    </OverwriteStatusDisplay>
  </div>)
}