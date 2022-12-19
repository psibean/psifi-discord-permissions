import { createSlice, current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { computePermissions } from "../permissions/calculator";
import { ChannelPermissionOverwrites, SelectedChannelType } from "../../../psd-types/src/types";

import { PsifiDiscordState } from "./store";

export type SimulatedServerPermissions = Record<string, string | undefined>;
export type UpdateServerPermissionPayload = { id: string, permission: string };

export type SimulatedChannel = { 
    id: string;
    name: string;
    type: SelectedChannelType;
    overwrites: ChannelPermissionOverwrites | undefined };
export type SimulatedChannels = Record<string, SimulatedChannel>;
export type CalcuclatedMemberPermissions = Record<string, string>;
type UpdatedRolesPayload = string[];

type UpdateRolesAction = {
  payload: UpdatedRolesPayload
}

export type SetSimulatedServerPayload = Omit<SimulatedServerState, "member"> & { member: Omit<SimulatedMember, "calculatedPermissions">};

export type SimulatedMember = {
    permissions: string;
    roles: string[];
    calculatedPermissions: CalcuclatedMemberPermissions;
};

export type SimulatedServerState = {
    id: string | null;
    name: string | null;
    permissions: SimulatedServerPermissions;
    member: SimulatedMember;
    channels: SimulatedChannels;
};


const calculateMemberPermissionsWithinState = (id: string, roles: string[], permissions: SimulatedServerPermissions, channels: SimulatedChannels) => {
    const calculatedPermissions: CalcuclatedMemberPermissions = {};
    for (const key of Object.keys(channels)) {
        const channelPermissions = computePermissions(id, roles, permissions, channels[key].overwrites);
        calculatedPermissions[key] = channelPermissions.toString();
    }
    return calculatedPermissions;
}

const simulatedServerSlice = createSlice({
    name: "simulatedServer",
    initialState: {
        id: null,
        name: null,
        permissions: {} as SimulatedServerPermissions,
        member: {
            roles: [] as string[],
            permissions: "0",
            calculatedPermissions: {} as CalcuclatedMemberPermissions,
        },
        channels: {} as SimulatedChannels
    } as SimulatedServerState,
    reducers: {
        setSimulatedServer: (state, action) => {
            const {
                id, name, channels, member, permissions
            } = action.payload as SetSimulatedServerPayload;

            const calculatedPermissions = calculateMemberPermissionsWithinState(id!, member.roles, permissions, channels);

            state.id = id;
            state.name = name;
            state.channels = channels;
            state.member = { ...member, calculatedPermissions };
            state.permissions = permissions;
        },
        setPermissions: (state, action: { payload: SimulatedServerPermissions}) => {
            state.permissions = action.payload;
        },
        updateServerPermission: (state, action) => {
            const permission = action.payload as UpdateServerPermissionPayload;
            state.permissions[permission.id] = permission.permission;
        },
        setMemberPermissions: (state, action) => {
            state.member.permissions = action.payload.permissions;
        },
        setMemberRoles: (state, action: UpdateRolesAction) => {
            const calculatedPermissions = calculateMemberPermissionsWithinState(state.id!, action.payload, current(state.permissions), current(state.channels));
            state.member.roles = action.payload;
            state.member.calculatedPermissions = calculatedPermissions;
        },
        setChannels: (state, action) => {
            state.channels = action.payload;
        },
        updateChannel: (state, action) => {
            const channel = action.payload as SimulatedChannel;
            state.channels[channel.id] = channel;
        }
    },
});

export const setServerPermissions = (data: SimulatedServerPermissions) =>
    simulatedServerSlice.actions.setPermissions(data);

export const updateServerPermission = (data: UpdateServerPermissionPayload) =>
    simulatedServerSlice.actions.updateServerPermission(data);

export const updateChannel = (data: SimulatedChannel) => 
    simulatedServerSlice.actions.updateChannel(data);

export const useMemberRoles = () => useSelector<PsifiDiscordState, string[]>(state => state.simulatedServer.member.roles);

export const setMemberRoles = (data: UpdatedRolesPayload) => simulatedServerSlice.actions.setMemberRoles(data);

export const setChannels =
 (data: SimulatedChannels) => simulatedServerSlice.actions.setChannels(data);


export const useSimulatedServer = () =>
    useSelector<PsifiDiscordState, SimulatedServerState>(
        (state) => state.simulatedServer
    );

export const setSimulatedServer = (data: SetSimulatedServerPayload) => simulatedServerSlice.actions.setSimulatedServer(data);

export const useSimulatedChannel = (id: string) => useSelector<PsifiDiscordState, SimulatedChannel | null>(state => state.simulatedServer.channels[id] ?? null)

export const useCalculatedMemberPermissionsForChannel = (channelId: string) => useSelector<PsifiDiscordState, bigint>(state => BigInt(state.simulatedServer.member.calculatedPermissions[channelId] ?? "0n"))

export default simulatedServerSlice.reducer;
