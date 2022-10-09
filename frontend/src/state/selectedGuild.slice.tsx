import { createSlice } from '@reduxjs/toolkit'
import {  useSelector  } from 'react-redux';
import type { ListedGuild, SelectedGuildRoles, SelectedGuildChannels } from '../../../psd-types/src/types';

import { PsifiDiscordState } from './store';

export type SelectedGuildState = {
  guild: ListedGuild | null;
  roles: SelectedGuildRoles;
  channels: SelectedGuildChannels;
}

const selectedGuldSlice = createSlice({
  name: 'selectedGuild',
  initialState: {
    guild: null,
    roles: [],
    channels: [],
    serverPermissions: [],
  },
  reducers: {
    selectGuild: (state, action) => {
      state.guild = action.payload.guild;
      state.roles = action.payload.roles;
      state.channels = action.payload.channels;
    }
  }
})

export const selectGuild =
 (data: SelectedGuildState) => selectedGuldSlice.actions.selectGuild(data);

 export const useSelectedGuild = () => useSelector<PsifiDiscordState, SelectedGuildState>(state => state.selectedGuild);
 export const useSelectedGuildId = () => useSelector<PsifiDiscordState, string | null>(state => state.selectedGuild.guild?.id ?? null)
 export const useSelectedGuildRoles = () => useSelector<PsifiDiscordState, SelectedGuildState['roles']>(state => state.selectedGuild.roles);
 export const useSelectedGuildChannels = () => useSelector<PsifiDiscordState, SelectedGuildState['channels']>(state => state.selectedGuild.channels);
 export const useGuild = () => useSelector<PsifiDiscordState, SelectedGuildState['guild']>(state => state.selectedGuild.guild);
 export default selectedGuldSlice.reducer;