import { SelectedGuildRole } from "../../../../psd-types/src/types";

export interface RoleItemProps {
  role: SelectedGuildRole;
  onClick?: () => void;
}

export interface RoleSearchItemProps extends RoleItemProps {
  selected: boolean;
}