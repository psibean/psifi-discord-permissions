import { configureStore } from '@reduxjs/toolkit'
import selectedChannelReducer, { SelectedChannelState } from './selectedChannel.slice';
import selectedGuildReducer, { SelectedGuildState } from './selectedGuild.slice';
import simulatedServerReducer, { SimulatedServerState } from './simulatedServer.slice';
import userReducer, { UserState } from './user.slice';

export type PsifiDiscordState = {
  user: UserState;
  selectedGuild: SelectedGuildState;
  selectedChannel: SelectedChannelState;
  simulatedServer: SimulatedServerState;
}

export default configureStore({
  reducer: {
    user: userReducer,
    selectedChannel: selectedChannelReducer,
    selectedGuild: selectedGuildReducer,
    simulatedServer: simulatedServerReducer
  }
})