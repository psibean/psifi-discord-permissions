import { createSlice } from '@reduxjs/toolkit'
import {  useSelector  } from 'react-redux';

import { PsifiDiscordState } from './store';
import type { ListedGuild, InternalOAuthProfile } from '../../../psd-types/src/types'

export type UserState = {
  profile: InternalOAuthProfile | null;
  guilds: ListedGuild[];
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    guilds: [] as ListedGuild[],
  },
  reducers: {
    login: (state, action) => {
      state.profile = action.payload.profile;
      state.guilds = action.payload.guilds;
    },
    logout: (state) => {
      state.profile = null;
      state.guilds = [];
    },
    removeGuild: (state, action) => {
      state.guilds = state.guilds.filter(guild => guild.id !== action.payload)
    }
  }
})

export const login = (data: UserState) =>
  userSlice.actions.login(data)

export const logout = () => userSlice.actions.logout();

export const removeGuild = (guildId: string) => userSlice.actions.removeGuild(guildId);

export const useUser = () => useSelector<PsifiDiscordState, UserState>(state => state.user);
export const useProfile = () => useSelector<PsifiDiscordState, UserState['profile'] | {}>(state => state.user.profile);
export const useGuilds = () => useSelector<PsifiDiscordState, UserState['guilds']>(state => state.user.guilds);
export default userSlice.reducer;