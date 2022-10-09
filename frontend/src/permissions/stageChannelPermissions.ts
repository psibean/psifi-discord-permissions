import { PermissionFlagsBits } from "discord-api-types/v10";
import { createInviteForVoiceChannel, createPsifiPermission, manageEventsPermissionForChannel, managePermissionsForChannel, viewChannelPermissionForChannel } from "./shared";

export const stageChannelPermissions = [
  // General Channel Permissions
  viewChannelPermissionForChannel,
  createPsifiPermission('Manage Channel', `(Required for Stage moderator) Allow members to set a topic to start the stage and enable or disable requests to speak. They can also delete the Stage channel.`, 'General Channel Permissions', PermissionFlagsBits.ViewChannel),
  managePermissionsForChannel,
  // Membership Permissions
  createInviteForVoiceChannel,

  // Voice Channel Permissions
  createPsifiPermission('Connect', 'Allow members to join this Stage channel as the audience.', 'Voice Channel Permissions', PermissionFlagsBits.Connect),
  createPsifiPermission('Mute Members', '(Required for Stage moderator) Allows members to mute other members in this voice channel for everyone.', 'Voice Channel Permissions', PermissionFlagsBits.MuteMembers),
  createPsifiPermission('Move Members', '(Required for Stage moderator) Allows members to disconnect other members from this channel. They will also be able to move members into other channels that theu have this permission in.', 'Voice Channel Permissions', PermissionFlagsBits.MoveMembers),
  // Stage Channel Permissions
  createPsifiPermission('Mention @everyone when a Stage starts', `Allow Stage moderators with this role to use @everyone when a Stage starts. This is the same permission as 'Mention @everyone, @here, and All Roles'`, 'Stage Channel Permissions', PermissionFlagsBits.MentionEveryone),
  // Events Permissions
  manageEventsPermissionForChannel
]