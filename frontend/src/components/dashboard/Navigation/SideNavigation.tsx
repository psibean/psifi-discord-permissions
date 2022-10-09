import SimulatedMemberRoles from "../../../components/SimulatedMemberRoles/SimulatedMemberRoles";
import { useSelectedGuild } from "../../../state/selectedGuild.slice";
import LogoutButton from "./LogoutButton";
import RolesAndPermissionsMenu from "./menus/RolesAndPermissionsMenu";
import NavigationHeader from "./NavigationHeader.js";
import SelectedGuild from "./SelectedGuild";
import SubMenu from "./SubMenu";


export type SideNavigationProps = {
  discordId: string
  avatar:  string;
  banner?: string;
  displayName: string;
}

const accountItems = [
  {
    label: "Account",
    path: "/dashboard/user/account"
  },
  {
    label: "Settings",
    path: "/dashboard/user/settings"
  }
]
 
export const SideNavigation = () => {
  const selectedGuild = useSelectedGuild();
  return <aside className="flex flex-col h-screen min-w-fit border-r overflow-y-auto border-slate-900/10 dark:border-slate-300/10">
    <NavigationHeader />
    <SelectedGuild />
    { selectedGuild.guild && <SimulatedMemberRoles />}
    <div className="flex flex-col max-h-full overflow-y-auto">
      <ul className="box-content pl-6">
        <RolesAndPermissionsMenu />
        <SubMenu title="User" items={accountItems} />
      </ul>
    </div>
      <LogoutButton />
  </aside>;
}