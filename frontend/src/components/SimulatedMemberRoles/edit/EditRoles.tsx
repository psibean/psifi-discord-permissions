import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setMemberRoles, useMemberRoles } from '../../../state/simulatedServer.slice';
import { useSelectedGuildRoles } from '../../../state/selectedGuild.slice';
import RoleSearchItem from './RoleSearchItem';
import RoleSearch, { RoleSearchFilterEventHandler } from './RoleSearch';

export type EditRolesProps = {
  id: string;
  guildId: string | null;
  onClose: () => void;
}

export default ({ guildId, onClose }: EditRolesProps) => {
  const roles = useSelectedGuildRoles();
  const memberRoles = useMemberRoles();
  const [filteredRoles, setFilteredRoles] = useState(Object.values(roles));
  const [filter, setFilter] = useState(null as boolean | null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEscape = (event: HTMLElementEventMap['keydown']) => {
      if ((event.key === 'Escape' || event.key === 'Esc')) {
        event.preventDefault();
        const rolesElement = document.getElementById("simulated-member-roles");
        const searchElement = rolesElement?.getElementsByTagName('input')[0];
        if (searchElement && searchElement.value === "") {
         onClose();
        } else if (searchElement) {
          searchElement.value = "";
          setSearch("");
        }
      }
    }

    const editRolesElement = document.getElementById("simulated-member-roles");
    editRolesElement?.addEventListener('keydown', handleEscape);
    editRolesElement?.getElementsByTagName('input')[0]?.focus();

    return () => {
      editRolesElement?.removeEventListener('keydown', handleEscape);
    }
  }, []);


  useEffect(() => {
    let rolesToFilter = Object.values(roles);
  
    if (filter) rolesToFilter = rolesToFilter.filter(role => memberRoles.includes(role.id))
    if (filter !== null && !filter) rolesToFilter = rolesToFilter.filter(role => !memberRoles.includes(role.id));

    if (search !== "") {
      rolesToFilter = rolesToFilter.filter(role => {
        return role.name === search || role.id === search || role.name.toLowerCase().includes(search);
      });
    }

    setFilteredRoles(rolesToFilter);
  }, [filter, search, memberRoles]);

  const handleRoleClicked = (clickedRole: string) => () => {
    if (clickedRole === guildId) {
        dispatch(setMemberRoles([guildId]));
    } else {
      if (memberRoles.includes(clickedRole)) {
        dispatch(setMemberRoles(memberRoles.filter(memberRole => memberRole !== clickedRole)));
      } else {
        dispatch(setMemberRoles([...memberRoles, clickedRole]));
      }
    }
  }

  const handleFilter: RoleSearchFilterEventHandler = newFilter => {
    setFilter(newFilter);
  }

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  return (
    <>
      <div className="flex flex-col overflow-y-auto scrollbar-base h-full w-full box-border border-slate-400">
        { filteredRoles.length > 0 ? filteredRoles.map((role) => (
            <RoleSearchItem 
              key={`${role.id}-member-selector`} 
              selected={memberRoles.includes(role.id)}
              onClick={handleRoleClicked(role.id)} role={role}
            />
        ))
        :
        <span className="p-4">No roles found...</span>
      }
      </div>
      <RoleSearch
        onFilter={handleFilter}
        filter={filter}
        onChange={handleSearch}
      />
    </>
  );
}
