import { PermissionFlagsBits } from "discord-api-types/v10";
import { createPsifiPermission, PsifiPermisssion } from "./shared";

// ALL SERVER PERMISSIONS
export const serverPermissions: PsifiPermisssion[] = [
  // General Server Permissions
  createPsifiPermission('View Channels', 'Allows members to view channels by default (excluding private channels).', 'General Server Permissions', PermissionFlagsBits.ViewChannel),
  createPsifiPermission('Manage Channels', 'Allows members to create, edit, or delete channels.', 'General Server Permissions', PermissionFlagsBits.ManageChannels),
  createPsifiPermission('Manage Roles', 'Allows members to create new roles and edit or delete roles lower than their highest role. Also allows members to change permissions of individual channels that they have access to.', 'General Server Permissions', PermissionFlagsBits.ManageRoles),
  createPsifiPermission('Manage Emoji and Stickers', 'Allows members to add or remove custom emoji and stickers in this server.', 'General Server Permissions', PermissionFlagsBits.ManageEmojisAndStickers),
  createPsifiPermission('View Audit Log', 'Allows members to view a record of who made which changes in this server.', 'General Server Permissions', PermissionFlagsBits.ViewAuditLog),
  createPsifiPermission('View Server Insights', 'Allows members to view Server Insights, which shows data on community growth, engagement, and more.', 'General Server Permissions', PermissionFlagsBits.ViewGuildInsights),
  createPsifiPermission('Manage Webhooks', 'Allows members to create, edit, or delete webhooks, which can post messages from other apps or sites into this server.', 'General Server Permissions', PermissionFlagsBits.ManageWebhooks),
  createPsifiPermission('Manage Server', `Allow members to change this server's name, switch regions, view all invites, add bots to this server and create and update AutoMod rules.`, 'General Server Permissions', PermissionFlagsBits.ManageGuild),
  // Membership Permissions
  createPsifiPermission('Create Invite', 'Allows members to invite new people to this server.', 'Membership Permissions', PermissionFlagsBits.CreateInstantInvite), 
  createPsifiPermission('Change Nickname', 'Allows members to change their own nickname, a custom name for just this server.', 'Membership Permissions', PermissionFlagsBits.ChangeNickname),
  createPsifiPermission('Manage Nicknames', 'Allows members to change the nicknames of other members.', 'Membership Permissions', PermissionFlagsBits.ManageNicknames),
  createPsifiPermission('Kick Members', 'Allows members to remove other members from this server. Kicked members will be able to rejoin if they have another invite.', 'Membership Permissions', PermissionFlagsBits.KickMembers),
  createPsifiPermission('Ban Members', 'Allows members to permanently ban other members from this server.', 'Membership Permissions', PermissionFlagsBits.BanMembers),
  createPsifiPermission('Timeout Members', 'When you put a user in timeout they will not be able to send messages in chat, reply within threads, react to messages, or speak in voice or Stage channels.', 'Membership Permissions', PermissionFlagsBits.ModerateMembers),
  // Text Channel Permissions
  createPsifiPermission('Send Messages and Create Posts', 'Allows members to send messages in text channels and create posts in forum channels.', 'Text Channel Permissions', PermissionFlagsBits.SendMessages),
  createPsifiPermission('Send Messages in Threads and Posts', 'Allows members to send messages in text channels and create posts in forum channels.', 'Text Channel Permissions', PermissionFlagsBits.SendMessagesInThreads),
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
  // Voice Channel Permissions
  createPsifiPermission('Connect', 'Allows members to join voice channels and hear others.', 'Voice Channel Permissions', PermissionFlagsBits.Connect),
  createPsifiPermission('Speak', 'Allows members to talk in voice channels. If this permissio,n is disabled, members are default muted until somebody with the “Mute Members” permission un-mutes them.', 'Voice Channel Permissions', PermissionFlagsBits.Speak),
  createPsifiPermission('Video', 'Allows members to share their video, screen share, or stream a game in this server.', 'Voice Channel Permissions', PermissionFlagsBits.Stream),
  createPsifiPermission('Use Activities', 'Allows members to use Activities in this server.', 'Voice Channel Permissions', PermissionFlagsBits.UseEmbeddedActivities),
  createPsifiPermission('Use Voice Activity', 'Allows members to speak in voice channels by simply talking. If this permission is disabled, members are required to use Push-to-talk. Good for controlling background noise or noisy members.', 'Voice Channel Permissions', PermissionFlagsBits.UseVAD),
  createPsifiPermission('Priority Speaker', 'Allows members to be more easily heard in voice channels. When activated, the volume of others without this permission will be automatically lowered. Priority Speaker is activated by using the Push to Talk (Priority) keybind.', 'Voice Channel Permissions', PermissionFlagsBits.PrioritySpeaker),
  createPsifiPermission('Mute Members', 'Allows members to mute other members in voice channels for everyone.', 'Voice Channel Permissions', PermissionFlagsBits.MuteMembers),
  createPsifiPermission('Deafen Members', 'Allows members to deafen other members in voice channels, which means they won’t be able to speak or hear others.', 'Voice Channel Permissions', PermissionFlagsBits.DeafenMembers),
  createPsifiPermission('Move Members', 'Allows members to move other members between voice channels that the member with this permission has access to.', 'Voice Channel Permissions', PermissionFlagsBits.MoveMembers),
  // Event Permissions
  createPsifiPermission('Manage Events', 'Allows members to create, edit, and cancel events.', 'Events Permissions', PermissionFlagsBits.ManageEvents),
  // Advanced Permissions
  createPsifiPermission('Administrator',
    'Members with this permission will have every permission and will also bypass all channel specific permissions or restrictions (for example, these members would get access to all private channels). This is a dangerous permission to grant.',
    'Advanced Permissions', PermissionFlagsBits.Administrator),
]