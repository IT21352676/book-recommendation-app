const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai'); // Adjust import based on package usage
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this key is set in your environment variables
});

// Define the endpoint for getting book recommendations
router.post('/recommend', async (req, res) => {
  const { readingHistory } = req.body; // Ensure you get readingHistory from the request

  if (!readingHistory) {
    return res.status(400).json({ error: 'Reading history is required' });
  }

  try {
    // Make the request to OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4' depending on the model you are using
      messages: [
        {
          role: 'user',
          content: `Based on the following reading history, recommend some books: ${readingHistory}`,
        },
      ],
    });

    // Extract recommendations from the response
    const recommendations = response.choices[0].message.content;

    // Send recommendations as the response
    res.json({ recommendations });
  } catch (error) {
    
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

module.exports = router;
