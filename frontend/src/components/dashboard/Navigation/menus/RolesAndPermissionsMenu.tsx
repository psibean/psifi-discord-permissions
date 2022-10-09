import { useCallback } from "react";
import { useGuild } from "../../../../state/selectedGuild.slice"
import SubMenu from "../SubMenu"


export default () => {
  const selectedGuild = useGuild();

  const getRolesAndPermissionItems = useCallback(() => {
    return [
      {
        label: "Server",
        path: `/dashboard/guilds/${selectedGuild?.id}`
      },
      {
        label: "Channels",
        path: `/dashboard/guilds/${selectedGuild?.id}/channels`,
      }
    ]
  }, [selectedGuild])

  return <SubMenu title="Roles & Permissions" items={getRolesAndPermissionItems()} />
}