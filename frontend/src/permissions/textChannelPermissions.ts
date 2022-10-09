import { PermissionFlagsBits } from "discord-api-types/v10";
import { createPsifiPermission, managePermissionsForChannel, PsifiPermisssion, viewChannelPermissionForChannel } from "./shared";

export const textChannelPermissions: PsifiPermisssion[] = [
  // GENERAL CHANNEL PERMISSIONS  

  viewChannelPermissionForChannel,
  createPsifiPermission('Manage Channel', `Allows members to change this channel's name, description, and text settings. They can also delete the channel.`, 'General Channel Permissions', PermissionFlagsBits.ManageChannels),
  managePermissionsForChannel,
  createPsifiPermission('Manage Webhooks', 'Allows members to create, edit, or delete webhooks in this channel, which can post messages from other apps or sites.', 'General Channel Permissions', PermissionFlagsBits.ManageWebhooks),
  // Membership Permissions
  createPsifiPermission('Create Invite', 'Allows members to invite new people to this server via a direct invite link to this channel.', 'Membership Permissions', PermissionFlagsBits.CreateInstantInvite), 
  // Text Channel Permissions
  createPsifiPermission('Send Messages', 'Allows members to send messages in this channel.', 'Text Channel Permissions', PermissionFlagsBits.SendMessages),
  createPsifiPermission('Send Messages in Threads', 'Allows members to send messages in threads under this channel.', 'Text Channel Permissions', PermissionFlagsBits.SendMessagesInThreads),
  createPsifiPermission('Create Public Threads', 'Allow members to create threads that everyone in a channel can view.', 'Text Channel Permissions', PermissionFlagsBits.CreatePublicThreads),
  createPsifiPermission('Create Private Threads', 'Allow members to create invite-only threads.', 'Text Channel Permissions', PermissionFlagsBits.CreatePrivateThreads),
  createPsifiPermission('Embed Links', 'Allows links that members share to show embedded content in text channels.', 'Text Channel Permissions', PermissionFlagsBits.EmbedLinks),
  createPsifiPermission('Attach Files', 'Allows members to upload files or media in text channels.', 'Text Channel Permissions', PermissionFlagsBits.AttachFiles),
  createPsifiPermission('Add Reactions', 'Allows members to add new emoji reactions to a message. If this permission is disabled, members can still react using any existing reactions on a message.', 'Text Channel Permissions', PermissionFlagsBits.AddReactions),
  createPsifiPermission('Use External Emoji', 'Allows members to use emoji from other servers, if they’re a Discord Nitro member.', 'Text Channel Permissions', PermissionFlagsBits.UseExternalEmojis),
  createPsifiPermission('Use External Stickers', 'Allows members to use stickers from other servers, if they’re a Discord Nitro member.', 'Text Channel Permissions', PermissionFlagsBits.UseExternalStickers),
  createPsifiPermission('Mention @everyone, @here, and All Roles', 'Allows members to use @everyone (everyone in the server) or @here (only online members in that channel). They can also @mention all roles, even if the role’s “Allow anyone to mention this role” permission is disabled.', 'Text Channel Permissions', PermissionFlagsBits.MentionEveryone),
  createPsifiPermission('Manage Messages', 'Allows members to delete messages by other members or pin any message.', 'Text Channel Permissions', PermissionFlagsBits.ManageMessages),
  createPsifiPermission('Manage Threads and Posts', 'Allows members to rename, delete, close, and turn on slow mode for threads and posts. They can also view private threads.', 'Text Channel Permissions', PermissionFlagsBits.ManageThreads),
  createPsifiPermission('Read Message History', 'Allows members to read previous messages sent in channels. If this permission is disabled, members only see messages sent when they are online and focused on that channel.', 'Text Channel Permissions', PermissionFlagsBits.ReadMessageHistory),
  createPsifiPermission('Send Text-to-Speech Messages', 'Allows members to send text-to-speech messages by starting a message with /tts. These messages can be heard by anyone focused on the channel.', 'Text Channel Permissions', PermissionFlagsBits.SendTTSMessages),
  createPsifiPermission('Use Application Commands', 'Allows members to use commands from applications, including slash commands and context menu commands.', 'Text Channel Permissions', PermissionFlagsBits.UseApplicationCommands),
]