const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
// Ensure you have GEMINI_API_KEY in your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE');

router.post('/chat', async (req, res) => {
    try {
        const { message, context, pageUrl } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            console.warn('GEMINI_API_KEY is missing in environment variables.');
            return res.status(503).json({
                error: 'AI service is currently unavailable. Please check server configuration.'
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      You are a helpful AI assistant for a Computer Science Education website.
      The user is currently viewing the page at: ${pageUrl}
      
      Here is the content/context from the page they are looking at:
      """
      ${context}
      """
      
      User's Question: ${message}
      
      Please answer the user's question. If the question is about the current page, use the provided context to explain it. 
      If the question is general programming help, you can answer that too.
      Keep your answers concise, helpful, and friendly. Use formatting (markdown) if necessary for code details.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to generate response. Please try again.' });
    }
});

module.exports = router;
