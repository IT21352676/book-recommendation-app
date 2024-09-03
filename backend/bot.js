const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

function startBot() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
    client.on("messageCreate", async (message) => {
        // Ignore messages from the bot itself
        if (message.author.bot) return;
    
        // Split the message content by spaces, handling the mentions and the command
       // const args = message.content.split(/ +/);
    
        // Check if the second part is the command "!addbook"
        if (message.content.startsWith(`<@${client.user.id}> !addbook`)) {
            console.log('Command received: !addbook');
            
            const args = message.content.split(/"([^"]+)"/);
            if (args.length < 4) {
                message.reply('Please provide a title, author, and description in the format: !addbook "Title" "Author" "Description"');
                return;
            }
        
            const title = args[1].trim();
            const author = args[3].trim();
            const description = args[5]?.trim() || ''; // Handling optional description
        
            console.log(`Title: ${title}`);
            console.log(`Author: ${author}`);
            console.log(`Description: ${description}`);
        
            // Add your code to send this data to your API
        
    
            // Make the API request to add the book
            try {
                const response = await axios.post('http://localhost:5000/api/books', {
                    title: title,
                    author: author,
                    description: description
                });
                console.log('Book added successfully:', response.data);
                message.channel.send(`Book "${title}" by ${author} added successfully!`);
            } catch (error) {
                console.error('Failed to add book:', error);
                message.channel.send('Failed to add book. Please try again.');
            }
        }


            // Command: !listbooks
            if (message.content.startsWith(`<@${client.user.id}> !listbooks`)) {
                console.log('Command received: !listbooks');
                
                // Call the API to get the list of books
                try {
                    const response = await axios.get('http://localhost:5000/api/books');
                    const books = response.data;

                    if (books.length === 0) {
                        message.channel.send("You don't have any books in your library.");
                    } else {
                        let bookList = 'Your Books:\n';
                        books.forEach((book, index) => {
                            bookList += `${index + 1}. ${book.title} by ${book.author}\n`;
                        });
                        message.channel.send(bookList);
                    }
                } catch (error) {
                    console.error("Failed to list books:", error);
                    message.channel.send("There was an error listing your books.");
                }
            }

            // Command: !deletebook "Book Name"
                if (message.content.startsWith(`<@${client.user.id}> !deletebook`)) {
                    console.log('Command received: !deletebook');
                    
                    // Extract the book name from the command
                    const args = message.content.split(/"([^"]+)"/);
                    
                    const bookName = args[1].trim();
            
                    console.log(bookName)

                    try {
                        // Call the API to delete the book
                        const response = await axios.delete(`http://localhost:5000/api/books/title/${bookName}`);

                        if (response.status === 200) {
                            message.channel.send(`The book "${bookName}" has been deleted successfully.`);
                        } else {
                            message.channel.send("Failed to delete the book.");
                        }
                    } catch (error) {
                        console.error("Failed to delete book:", error);
                        message.channel.send("There was an error deleting the book.");
                    }
                }

                // Command: !editbook "Book Name" "New Title" "New Author" "New Description"
                if (message.content.startsWith(`<@${client.user.id}> !editbook`)) {
                    console.log('Command received: !editbook');
                    
                    // Extract the book name and new details from the command
                    const args = message.content.split(/"([^"]+)"/);
                    
                    if (args.length < 4) {
                        message.channel.send("Please provide the book name, new title, new author, and new description.");
                        return;
                    }


                    console.log(args);
                    


                    const trimmedArgs = args.map(arg => arg.trim()).filter(arg => arg !== '');

                    
                    const id = trimmedArgs[0]; 
                    const bookName = trimmedArgs[1]; 
                    const newTitle = trimmedArgs[2]; 
                    const newAuthor = trimmedArgs[3]; 
                    const newDescription = trimmedArgs.slice(4).join(" "); 

                    console.log(id);             
                    console.log(bookName);      
                    console.log(newTitle);       
                    console.log(newAuthor);      
                    console.log(newDescription);


                    try {
                        // Call the API to update the book details
                        const response = await axios.put(`http://localhost:5000/api/books/title/${bookName}`, {
                            title: newTitle,
                            author: newAuthor,
                            description: newDescription
                        });

                        if (response.status === 200) {
                            message.channel.send(`The book "${bookName}" has been updated successfully.`);
                        } else {
                            message.channel.send("Failed to update the book.");
                        }
                    } catch (error) {
                        console.error("Failed to edit book:", error);
                        message.channel.send("There was an error editing the book.");
                    }
                }


    });
      
      
      

    
    client.login('');
}

module.exports = startBot;














































































































