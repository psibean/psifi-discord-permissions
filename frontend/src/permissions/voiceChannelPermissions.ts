import { PermissionFlagsBits } from "discord-api-types/v10";
import { createInviteForVoiceChannel, createPsifiPermission, manageEventsPermissionForChannel, managePermissionsForChannel, viewChannelPermissionForChannel } from "./shared";

export const voiceChannelPermissions = [
  // GENERAL CHANNEL PERMISSIONS  
  viewChannelPermissionForChannel,
  createPsifiPermission('Manage Channel', `Allows members to change this channel's name, description, and voice settings. They can also delete the channel.`, 'General Channel Permissions', PermissionFlagsBits.ViewChannel),
  managePermissionsForChannel,
  // Membership Permissions
  createInviteForVoiceChannel,
  // Voice Channel Permissions
  createPsifiPermission('Connect', 'Allows members to join the voice channel and hear others.', 'Voice Channel Permissions', PermissionFlagsBits.Connect),
  createPsifiPermission('Speak', 'Allows members to talk in this voice channel. If this permission is disabled, members are default muted until somebody with the “Mute Members” permission un-mutes them.', 'Voice Channel Permissions', PermissionFlagsBits.Speak),
  createPsifiPermission('Video', 'Allows members to share their video, screen share, or stream a game in this voice channel.', 'Voice Channel Permissions', PermissionFlagsBits.Stream),
  createPsifiPermission('Use Activities', 'Allows members to use Activities in this voice channel.', 'Voice Channel Permissions', PermissionFlagsBits.UseEmbeddedActivities),
  createPsifiPermission('Use Voice Activity', 'Allows members to speak in this voice channel by simply talking. If this permission is disabled, members are required to use Push-to-talk. Good for controlling background noise or noisy members.', 'Voice Channel Permissions', PermissionFlagsBits.UseVAD),
  createPsifiPermission('Priority Speaker', 'Allows members to be more easily heard in this voice channel. When activated, the volume of others without this permission will be automatically lowered. Priority Speaker is activated by using the Push to Talk (Priority) keybind.', 'Voice Channel Permissions', PermissionFlagsBits.PrioritySpeaker),
  createPsifiPermission('Mute Members', 'Allows members to mute other members in this voice channel for everyone.', 'Voice Channel Permissions', PermissionFlagsBits.MuteMembers),
  createPsifiPermission('Deafen Members', 'Allows members to deafen other members in this voice channel, which means they won’t be able to speak or hear others.', 'Voice Channel Permissions', PermissionFlagsBits.DeafenMembers),
  createPsifiPermission('Move Members', 'Allows members to disconnect other members from this channel. They will also be able to move members into other channels that theu have this permission in.', 'Voice Channel Permissions', PermissionFlagsBits.MoveMembers),
  // Voice Channel Chat Permissions
  createPsifiPermission('Send Messages', 'Allows members to send messages in this channel.', 'Voice Channel Chat Permissions', PermissionFlagsBits.SendMessages),
  createPsifiPermission('Embed Links', 'Allows links that members share to show embedded content in this channel.', 'Voice Channel Chat Permissions', PermissionFlagsBits.EmbedLinks),
  createPsifiPermission('Attach Files', 'Allows members to upload files or media in this channel.', 'Voice Channel Chat Permissions', PermissionFlagsBits.AttachFiles),
  createPsifiPermission('Add Reactions', 'Allows members to add new emoji reactions to a message in this channel and send reactions in voice channels. If this permission is disabled, members can still react using any existing reactions on a message.', 'Voice Channel Chat Permissions', PermissionFlagsBits.AddReactions),


  createPsifiPermission('Send Messages in Threads', 'Allows members to send messages in threads under this channel.', 'Text Channel Permissions', PermissionFlagsBits.SendMessagesInThreads),
  createPsifiPermission('Create Public Threads', 'Allow members to create threads that everyone in a channel can view.', 'Text Channel Permissions', PermissionFlagsBits.CreatePublicThreads),
  createPsifiPermission('Create Private Threads', 'Allow members to create invite-only threads.', 'Text Channel Permissions', PermissionFlagsBits.CreatePrivateThreads),
  createPsifiPermission('Embed Links', 'Allows links that members share to show embedded content in text channels.', 'Text Channel Permissions', PermissionFlagsBits.EmbedLinks),
  
  
  createPsifiPermission('Use External Emoji', 'Allows members to use emoji from other servers, if they’re a Discord Nitro member.', 'Voice Channel Chat Permissions', PermissionFlagsBits.UseExternalEmojis),
  createPsifiPermission('Use External Stickers', 'Allows members to use stickers from other servers, if they’re a Discord Nitro member.', 'Voice Channel Chat Permissions', PermissionFlagsBits.UseExternalStickers),
  createPsifiPermission('Mention @everyone, @here, and All Roles', 'Allows members to use @everyone (everyone in the server) or @here (only online members in that channel). They can also @mention all roles, even if the role’s “Allow anyone to mention this role” permission is disabled.', 'Voice Channel Chat Permissions', PermissionFlagsBits.MentionEveryone),
  createPsifiPermission('Manage Messages', 'Allows members to delete messages by other members or pin any message.', 'Text Channel Permissions', PermissionFlagsBits.ManageMessages),
  createPsifiPermission('Read Message History', 'Allows members to read previous messages sent in channels. If this permission is disabled, members only see messages sent when they are online and focused on that channel.', 'Voice Channel Chat Permissions', PermissionFlagsBits.ReadMessageHistory),
  createPsifiPermission('Send Text-to-Speech Messages', 'Allows members to send text-to-speech messages by starting a message with /tts. These messages can be heard by anyone focused on the channel.', 'Voice Channel Chat Permissions', PermissionFlagsBits.SendTTSMessages),
  createPsifiPermission('Use Application Commands', 'Allows members to use commands from applications, including slash commands and context menu commands.', 'Voice Channel Chat Permissions', PermissionFlagsBits.UseApplicationCommands),

  // EVENT PERMISSIONS
  manageEventsPermissionForChannel

]