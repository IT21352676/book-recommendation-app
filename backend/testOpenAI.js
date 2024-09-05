const { OpenAI } = require('openai');

// For testing of the OPENAI API

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // OpenAI API KEY
});

// Testing recomendations
const getRecommendations = async () => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'What books should I read?' }],
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }
};

getRecommendations();
