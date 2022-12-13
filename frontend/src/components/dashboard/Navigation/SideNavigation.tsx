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
 
export const SideNavigation = () => {
  const selectedGuild = useSelectedGuild();
  return <aside className="flex flex-col h-screen min-w-fit border-r overflow-y-auto border-slate-900/10 dark:border-slate-300/10">
    <NavigationHeader />
    <SelectedGuild />
    { selectedGuild.guild && <SimulatedMemberRoles />}
    <LogoutButton />
  </aside>;
}