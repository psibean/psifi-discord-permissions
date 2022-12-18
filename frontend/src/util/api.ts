import { Dispatch } from '@reduxjs/toolkit';
import { setSimulatedServer, SimulatedChannels, SimulatedServerPermissions } from '../state/simulatedServer.slice';
import { selectChannel } from '../state/selectedChannel.slice';
import { SelectedGuild, selectGuild } from '../state/selectedGuild.slice';
import { login, UserState } from '../state/user.slice';
import { API_ROUTES, PSD_API_URL } from './constants';
import { ChannelPermissionOverwrites, DiscordUserData, SelectedGuildChannel, SelectedGuildChannels } from '../../../psd-types/src/types';
import RequestError from './RequestError';

export const get = (url: string, options: RequestInit = {}) => {
  return fetch(url, {
    ...options,
    method: 'GET'
  }).then(response => response.json());
}

export const authenticatedGet = (url: string, request: RequestInit = {}) => {
  return fetch(`${PSD_API_URL}${url}`, {
    ...request,
    signal: request.signal,
    credentials: "include",
    method: 'GET'
  });
}

export const authenticatedGetJson = async <T extends Record<string, unknown>>(url: string, request: RequestInit = {}) => {
  const requestResponse = await authenticatedGet(url, request);
  const responseData = await requestResponse.json() as T | { message: string };
  if ("message" in responseData) {
    throw new RequestError(requestResponse.status, (responseData as { message: string }).message);
  }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return responseData;
}

export const authenticatedPost = async (url: string, options: RequestInit = {}) => {
  const csrfTokenResponse = await authenticatedGet(API_ROUTES.CSRF_TOKEN);
  const { token } = await csrfTokenResponse.json() as { token: string };

  return fetch(`${PSD_API_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'x-csrf-token': token
    },
    method: 'POST',
    credentials: "include"
  });
}

export const authenticatedPostJson = async <T extends Record<string, unknown>>(url: string, options: RequestInit = {}) => {
  const response = await authenticatedPost(url, options);
  const responseData = await response.json() as T;
  if ("error" in responseData) {
    throw new RequestError(response.status, (responseData.error as { message: string }).message);
  }
  if (response.status === 200) return responseData;
}

export const fetchUserData = (dispatch: Dispatch) => {
  return authenticatedGetJson<DiscordUserData>(API_ROUTES.USER).then((data) => {
    console.log("Got profile:");
    console.log(data);
    dispatch(login(data as UserState));
  });
}

export const fetchGuild = async (guildId: string, dispatch: Dispatch) => {
  try {
    const selectedGuild = await authenticatedGetJson<SelectedGuild>(API_ROUTES.GUILD(guildId));
    const initialChannels: SimulatedChannels = {};
    for (const [channelId, selectedGuildChannel] of Object.entries(selectedGuild.channels)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      initialChannels[channelId] = { id: channelId, type: selectedGuildChannel.type, name: selectedGuildChannel.name, overwrites: {}};
      for (const [roleId, roleOverwrites] of Object.entries(selectedGuildChannel.permissionOverwrites)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (initialChannels[channelId].overwrites as ChannelPermissionOverwrites)[roleId] = roleOverwrites;
      }
    }
    const serverPermissions = Object.values(selectedGuild.roles).reduce((previous, current) => {
      previous[current.id] = current.permissions;
      return previous;
    }, {} as SimulatedServerPermissions );
  
    const rolePermissions: Record<string, string> = {};
    Object.values(selectedGuild.roles).forEach(role => {
      rolePermissions[role.id] = role.permissions;
    })
      
    dispatch(selectGuild(selectedGuild));
    dispatch(setSimulatedServer({
      id: selectedGuild.guild.id,
      name: selectedGuild.guild.name,
      channels: initialChannels,
      permissions: serverPermissions,
      member: {
        permissions: "0",
        roles: [selectedGuild.guild.id]
      },
    }))
  } catch (error) {
    if (typeof error === 'string') {
      throw new Error(error);
    }
    throw error;
  }
}

export const fetchChannels = (guildId: string) => {
  return authenticatedGetJson<SelectedGuildChannels>(API_ROUTES.GUILD_CHANNELS(guildId));
}

export const fetchChannel = (guildId: string, channelId: string, dispatch: Dispatch) => {
  return authenticatedGetJson<SelectedGuildChannel>(API_ROUTES.CHANNEL(guildId, channelId)).then(selectedGuildChannel => {
      dispatch(selectChannel(selectedGuildChannel));
  });
}