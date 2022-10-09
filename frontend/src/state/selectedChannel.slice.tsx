import { createSlice } from '@reduxjs/toolkit'
import {  useSelector  } from 'react-redux';
import type { ListedGuild } from '../../../psd-types/src/types';

import { PsifiDiscordState } from './store';

export type SelectedChannelState = {
  channel: ListedGuild | null;
  permissionOverrides: Record<string, bigint> | null;
}

const selectedChannelslice = createSlice({
  name: 'selectedChannel',
  initialState: {
    channel: null,
    permissionOverrides: null,
  },
  reducers: {
    selectChannel: (state, action) => {
      state.channel = action.payload.channel;
      state.permissionOverrides = action.payload.permissionOverrides;
    }
  }
})

export const selectChannel =
 (data: SelectedChannelState) => selectedChannelslice.actions.selectChannel(data);

 export const useSelectedChannel = () => useSelector<PsifiDiscordState, SelectedChannelState>(state => state.selectedChannel);
 export default selectedChannelslice.reducer;