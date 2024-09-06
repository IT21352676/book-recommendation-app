const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

function startBot() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

    // Client logging in
    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;
    
    
        // !addbook "Title" "Author" "Description" Add Book Command
        if (message.content.startsWith(`<@${client.user.id}> !addbook`)) {
            console.log('Command received: !addbook');

            console.log(`User : ${client.user.id}`);
            
            const args = message.content.split(/"([^"]+)"/);
            if (args.length < 4) {
                message.reply('Please provide a title, author, and description in the format: !addbook "Title" "Author" "Description"');
                return;
            }
        
            const title = args[1].trim();
            const author = args[3].trim();
            const description = args[5]?.trim() || '';
        
            console.log(`Title: ${title}`);
            console.log(`Author: ${author}`);
            console.log(`Description: ${description}`);
        
        
            // Call the API request to add the book
            try {
                const response = await axios.post('https://clownfish-app-3h2ig.ondigitalocean.app/api/books', {
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


            // !listbooks List Books Command
            if (message.content.startsWith(`<@${client.user.id}> !listbooks`)) {
                console.log('Command received: !listbooks');

                console.log(`User : ${client.user.id}`);
                
                // Call the API to get the list of books
                try {
                    const response = await axios.get('https://clownfish-app-3h2ig.ondigitalocean.app/api/books');
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

                // !deletebook "Title" Delete Book Command
                if (message.content.startsWith(`<@${client.user.id}> !deletebook`)) {
                    console.log('Command received: !deletebook');
                    
                    console.log(`User : ${client.user.id}`);

                    const args = message.content.split(/"([^"]+)"/);
                    
                    const bookName = args[1].trim();
            
                    console.log(bookName)

                    try {
                        // Call the API to delete the book
                        const response = await axios.delete(`https://clownfish-app-3h2ig.ondigitalocean.app/api/books/title/${bookName}`);

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
                        const response = await axios.put(`https://clownfish-app-3h2ig.ondigitalocean.app/api/books/title/${bookName}`, {
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


            // !addreview "BookName" "UserName" "Rating 1-5" "Genre" Add Review Command
            if (message.content.startsWith(`<@${client.user.id}> !addreview`)) {
                console.log('Command received: !addreview');

                console.log(`User : ${client.user.id}`);

                const args = message.content.split(/"([^"]+)"/);


                if (args.length < 4) {
                    message.channel.send("Please provide the book name, new title, new author, and new description.");
                    return;
                }

                const trimmedArgs = args.map(arg => arg.trim()).filter(arg => arg !== '');

                const id = trimmedArgs[0]; 
                const bookName = trimmedArgs[1]; 
                const userName = trimmedArgs[2]; 
                const rating = parseInt(trimmedArgs[3]); 
                const genre = trimmedArgs.slice(4).join(" ");

                console.log(bookName);
                console.log(userName);
                console.log(rating);
                console.log(genre);

                // Call the API to add the review
                try {
                    const response = await axios.post('https://clownfish-app-3h2ig.ondigitalocean.app/api/reviews', {
                        bookName: bookName,
                        UserName: userName,
                        rating: rating,
                        genre:genre
                    });
                    console.log('Review added successfully:', response.data);
                    message.channel.send(`Review for "${bookName}" added ${rating} stars by ${userName} successfully!`);
                } catch (error) {
                    console.error('Failed to add review:', error);
                    message.channel.send('Failed to add review. Please try again.');
                }


            }
            // !listreview List Review Command 
            if (message.content.startsWith(`<@${client.user.id}> !listreviews`)) {
                console.log('Command received: !listreviews');

                console.log(`User : ${client.user.id}`);
                
                // Call the API to get the list of reviews
                try {
                    const response = await axios.get('https://clownfish-app-3h2ig.ondigitalocean.app/api/reviews');
                    const reviews = response.data;

                    if (reviews.length === 0) {
                        message.channel.send("No any reviews to view.");
                    } else {
                        let reviewList = 'All reviews:\n';
                        reviews.forEach((review, index) => {
                            reviewList += `${index + 1}. For "${review.bookName}" ${review.rating} star rating added by ${review.UserName}\n`;
                        });
                        message.channel.send(reviewList);
                    }
                } catch (error) {
                    console.error("Failed to list reviews", error);
                    message.channel.send("There was an error listing reviews.");
                }
            }

            // !deletereview "BookName" "UserName" Delete Review Command
            if (message.content.startsWith(`<@${client.user.id}> !deletereview`)) {
                console.log('Command received: !deletereview');

                console.log(`User : ${client.user.id}`);

                const args = message.content.split(/"([^"]+)"/);

                if (args.length < 2) {
                    message.channel.send('"Please provide the book name and username !deletereview "Book Name" "User Name".');
                    return;
                }

                const trimmedArgs = args.map(arg => arg.trim()).filter(arg => arg !== '');

                const id = trimmedArgs[0]; 
                const bookName = trimmedArgs[1]; 
                const userName = trimmedArgs[2]; 
                const rating = parseInt(trimmedArgs[3]); 
                const genre = trimmedArgs.slice(4).join(" ");

                // Call the API to delete the review
                try {
                    const response = await axios.delete(`https://clownfish-app-3h2ig.ondigitalocean.app/api/reviews/${bookName}/${userName}`, {
                        data: { bookName, userName }
                    });

                    if (response.data === 'Review not found') {
                        message.reply(`Review not found for ${bookName} by ${userName}.`);
                    } else {
                        message.reply(`Review for ${bookName} by ${userName} deleted.`);
                    }
                } catch (error) {
                    console.error(error);
                    message.reply('Failed to delete the review.');
                }
}



    });
      
      
      

    
    client.login(process.env.DISCORD_BOT_TOKEN);
}

module.exports = startBot;














































































































