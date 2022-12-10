import { createSlice } from '@reduxjs/toolkit'
import {  useSelector  } from 'react-redux';
import type { ListedGuild, SelectedGuildChannel } from '../../../psd-types/src/types';
import { PsifiPermission } from "../permissions/shared";
import { PsifiDiscordState } from './store';

export type SelectedChannelState = {
  channel: SelectedGuildChannel | null;
}

const selectedChannelslice = createSlice({
  name: 'selectedChannel',
  initialState: {
    channel: null,
  },
  reducers: {
    selectChannel: (state, action) => {
      state.channel = action.payload;
    }
  }
})

export const selectChannel =
 (data: SelectedGuildChannel) => selectedChannelslice.actions.selectChannel(data);

 export const useSelectedChannel = () => useSelector<PsifiDiscordState, SelectedChannelState>(state => state.selectedChannel);
 export default selectedChannelslice.reducer;