const { OpenAI } = require('openai');

// Initialize OpenAI client directly with API key
const openai = new OpenAI({
  apiKey: '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',
});

// Example function to use OpenAI API
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
