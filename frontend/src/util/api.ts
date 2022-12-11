import { Dispatch } from '@reduxjs/toolkit';
import { setSimulatedServer, SimulatedChannels, SimulatedServerPermissions } from '../state/simulatedServer.slice';
import { selectChannel } from '../state/selectedChannel.slice';
import { SelectedGuildState, selectGuild } from '../state/selectedGuild.slice';
import { login, UserState } from '../state/user.slice';
import { API_ROUTES, PSD_API_URL } from './constants';
import { ChannelPermissionOverwrites, SelectedGuildChannel, SelectedGuildChannels, SelectedGuildRoles } from '../../../psd-types/src/types';

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

export const authenticatedGetJson = <T>(url: string, request: RequestInit = {}) => {
  return authenticatedGet(url, request)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    .then(res => res.json().then(data => ({ status: res.status, data } as { status: number, data: T }))
    );
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
  })
}

export const fetchUserData = (dispatch: Dispatch) => {
  return authenticatedGetJson(API_ROUTES.USER).then(({ status, data }) => {
    if (status === 200) {
      dispatch(login(data as UserState));
    } else {
      throw data;
    }
  });
}

export const fetchGuild = (guildId: string, dispatch: Dispatch) => {
  return authenticatedGetJson<SelectedGuildState>(API_ROUTES.GUILD(guildId)).then(({status, data }) => {
    if (status === 200 && data.guild !== null) {
      const initialChannels: SimulatedChannels = {};

      for (const [channelId, selectedGuildChannel] of Object.entries(data.channels)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        initialChannels[channelId] = { id: channelId, type: selectedGuildChannel.type, name: selectedGuildChannel.name, overwrites: {}};
        for (const [roleId, roleOverwrites] of Object.entries(selectedGuildChannel.permissionOverwrites)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (initialChannels[channelId].overwrites as ChannelPermissionOverwrites)[roleId] = roleOverwrites;
        }
      }

      const serverPermissions = Object.values(data.roles).reduce((previous, current) => {
        previous[current.id] = current.permissions;
        return previous;
      }, {} as SimulatedServerPermissions );

      const rolePermissions: Record<string, string> = {};
      Object.values(data.roles).forEach(role => {
        rolePermissions[role.id] = role.permissions;
      })
      
      dispatch(selectGuild(data));
      dispatch(setSimulatedServer({
        id: data.guild.id,
        name: data.guild.name,
        channels: initialChannels,
        permissions: serverPermissions,
        member: {
          permissions: "0",
          roles: [data.guild.id]
        },
      }))
    } else {
      dispatch(selectGuild({ guild: null, channels: {} as SelectedGuildChannels , roles: {} as SelectedGuildRoles }));
      throw data;
    }
  });
}

export const fetchChannels = (guildId: string) => {
  return authenticatedGetJson(API_ROUTES.GUILD_CHANNELS(guildId))
}

export const fetchChannel = (guildId: string, channelId: string, dispatch: Dispatch) => {
  return authenticatedGetJson(API_ROUTES.CHANNEL(guildId, channelId)).then(({ status, data }) => {
    if (status === 200) {
      dispatch(selectChannel(data as SelectedGuildChannel));
    }
  });
}