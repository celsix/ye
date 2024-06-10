require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new Discord client with the necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Get the bot token from environment variables
const TOKEN = "MTI0OTQzNDkzMDA3MzgzMzU0Mg.G2VkU8.5Cp_Wwehi43lWkQXCtAWfKRTr-WCXlYIpwjeZ8"

// Replace with the actual user ID you want to ping
const userIdToPing = '1213567841756774494';
const userIdSoggy = '1129912939088990248';

// Channel ID for "yippie"
const channelId = '1231688533090238507';

// Variables to keep track of ongoing pings
let stopPingingSoggy = false;
let stopPingingLovely = false;

// Log a message when the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Handle incoming messages
client.on('messageCreate', async message => {
    if (message.content === 'ping lovely') {
        console.log('Ping command received.');

        if (!message.guild) {
            message.channel.send("This command can only be used in a server.");
            return;
        }

        // Check if the message was sent in the specified channel
        if (message.channel.id !== channelId) {
            message.channel.send(`Please use this command in <#${channelId}>.`);
            return;
        }

        try {
            // Fetch the user by ID
            const userToPing = await message.guild.members.fetch(userIdToPing);

            console.log('User to ping:', userToPing);

            // Reset the stop flag
            stopPingingLovely = false;

            // Send a message pinging the user 200 times with a delay
            for (let i = 0; i < 200; i++) {
                if (stopPingingLovely) break;
                setTimeout(() => {
                    if (!stopPingingLovely) {
                        message.channel.send(`<@${userToPing.id}>`);
                    }
                }, i * 1000); // 1 second delay between each ping
            }

            // Send confirmation message
            // message.channel.send("");
        } catch (error) {
            console.error('Error fetching user:', error);
            message.channel.send("User not found or bot lacks permission.");
        }
    } else if (message.content.toLowerCase().includes('ping soggy')) {
        console.log('Ping Soggy command received.');

        // Reset the stop flag
        stopPingingSoggy = false;

        // Ping the user with userIdSoggy 200 times with a delay
        for (let i = 0; i < 200; i++) {
            if (stopPingingSoggy) break;
            setTimeout(() => {
                if (!stopPingingSoggy) {
                    message.channel.send(`<@${userIdSoggy}>`);
                }
            }, i * 1000); // 1 second delay between each ping
        }
    } else if (message.content.toLowerCase() === 'stop soggy') {
        console.log('Stop Soggy command received.');
        stopPingingSoggy = true;
        message.channel.send("okkkaayyyyyy :plead:");
    } else if (message.content.toLowerCase() === 'stop lovely') {
        console.log('okkaayyyy :plead:');
        stopPingingLovely = true;
        message.channel.send("okkkayyyy :plead:");
    } else if (message.content === '---hello') {
        message.channel.send('Hello!');
    }
});

// Log the bot in using the token
client.login(TOKEN).catch(err => {
    console.error('Failed to log in:', err);
});
