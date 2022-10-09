import { Client, GatewayIntentBits } from 'discord.js';

const botClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ]
})

export default botClient;