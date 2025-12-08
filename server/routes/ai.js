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

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are a helpful AI assistant for a Computer Science Education website.
      The user is currently viewing the page at: ${pageUrl}
      
      Here is the content/context from the page they are looking at:
      """
      ${context}
      """
      
      User's Question: ${message}
      
      INSTRUCTIONS:
      1. If the context contains "USER CODE EDITOR CONTENT", the user is likely solving a coding problem. 
         - If they ask for help, explain the logic or syntax.
         - If they ask for "optimal code" or "suggestions", analyze their code for complexity and suggest improvements.
         - Do NOT solve the problem for them unless they explicitly ask for the solution (try to guide them first).
      2. If the user asks about the page content, use the provided context.
      3. Use markdown for code blocks.
      4. Keep answers concise and encouraging.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: error.message || 'Failed to generate response. Please try again.' });
    }
});

module.exports = router;
