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
      state.profile = action.payload;
    },
    logout: (state) => {
      state.profile = null;
      state.guilds = [];
    },
    setGuilds: (state, action) => {
      state.guilds = action.payload;
    }
  }
})

export const login = (data: InternalOAuthProfile) =>
  userSlice.actions.login(data)

export const logout = () => userSlice.actions.logout();

export const setListedGuilds = (guilds: ListedGuild[]) => userSlice.actions.setGuilds(guilds);

export const useUser = () => useSelector<PsifiDiscordState, UserState>(state => state.user);
export const useProfile = () => useSelector<PsifiDiscordState, UserState['profile'] | {}>(state => state.user.profile);
export const useListedGuilds = () => useSelector<PsifiDiscordState, UserState['guilds']>(state => state.user.guilds);
export default userSlice.reducer;