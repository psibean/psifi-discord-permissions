import { PermissionFlagsBits } from "discord-api-types/v10";

export type PsifiPermission = {
  name: string;
  category: string;
  description: string;
  bitfield: bigint;
  has: (permissions: bigint) => boolean;
}

export const createPsifiPermission = (name: string, description: string, category: string, bitfield: bigint): PsifiPermission => {
  return {
    name,
    description,
    category,
    bitfield,
    has(permissions: bigint) {
      return (permissions & bitfield) === bitfield;
    }
  }
}

export const viewChannelPermissionForChannel = createPsifiPermission('View Channel', 'Allows members to view this channel by default.', 'General Channel Permissions', PermissionFlagsBits.ViewChannel);
export const managePermissionsForChannel = createPsifiPermission('Manage Permissions', `Allows members to change this channel's permissions`, 'General Channel Permissions', PermissionFlagsBits.ManageRoles);
export const createInviteForVoiceChannel = createPsifiPermission('Create Invite', 'Allows members to invite new people to this server via a direct invite link to this channel. The recipient will automatically join the voice channel if they have permission to connect.', 'Membership Permissions', PermissionFlagsBits.CreateInstantInvite);
export const manageEventsPermissionForChannel = createPsifiPermission('Manage Events', 'Allows members to create, edit, and cancel events in this channel.', 'Events Permissions', PermissionFlagsBits.ManageEvents);

export const hasPermission = (permissionToCheck: bigint, permissions: bigint, checkAdmin = true) => (checkAdmin && ((permissions & PermissionFlagsBits.Administrator) === PermissionFlagsBits.Administrator)) || (permissions & permissionToCheck) === permissionToCheck;