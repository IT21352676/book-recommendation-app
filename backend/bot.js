const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

function startBot() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
    client.on('messageCreate', async (message) => {
        console.log('Message received: ', message.content);
    
        if (message.content.startsWith('!addbook')) {
            const args = message.content.split(' ').slice(1);
            const title = args.join(' ');
    
            console.log('Title parsed: ', title);
    
            if (!title) {
                message.channel.send('Please provide a book title.');
                return;
            }
    
            try {
                console.log('Sending API request to add book...');
                const response = await axios.post('http://localhost:5000/api/books', {
                    title: title,
                    author: 'Unknown',
                    description: 'No description provided.',
                });
    
                console.log('API response: ', response.data);
                message.channel.send(`Book "${title}" has been added successfully.`);
            } catch (error) {
                console.error('Error adding book:', error);
                message.channel.send('Failed to add the book.');
            }
        }
    });
    
    client.login('MTI4MDIzOTkxNjAzNDQyOTA5Mw.G7M4f5.PL2j4IB7l5wzYNLvHGGqWrwldjXv2AWVVFgZ9k');
}

module.exports = startBot;














































































































