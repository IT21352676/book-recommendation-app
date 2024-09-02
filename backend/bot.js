const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const TOKEN = 'MTI4MDIzOTkxNjAzNDQyOTA5Mw.G7M4f5.PL2j4IB7l5wzYNLvHGGqWrwldjXv2AWVVFgZ9k';  // Replace with your actual bot token


const API_URL = 'http://localhost:5000/api/books'; // Replace with your API URL

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event triggered when a message is received
client.on('messageCreate', async message => {
    console.log('Message received:', message.content); // For debugging

    if (message.content.startsWith('!addbook')) {
        console.log('Command received: !addbook'); // For debugging

        // Extract arguments from the command
        const args = message.content.slice(9).trim().split('" "').map(arg => arg.replace(/"/g, ''));
        const [title, author, description] = args;

        if (!title || !author || !description) {
            message.reply('Please provide the title, author, and description. Usage: `!addbook [title] [author] [description]`');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/books', {
                title,
                author,
                description,
            });

            if (response.status === 201) {
                message.reply(`Book added successfully: ${title} by ${author}`);
            } else {
                message.reply('Failed to add the book. Please try again later.');
            }
        } catch (error) {
            console.error('Error adding book:', error);
            message.reply('Failed to add the book. Please try again later.');
        }
    }
});

// Log in to Discord with your bot's token
client.login(MTI4MDIzOTkxNjAzNDQyOTA5Mw.G7M4f5.PL2j4IB7l5wzYNLvHGGqWrwldjXv2AWVVFgZ9k);































































