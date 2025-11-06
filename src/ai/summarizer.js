const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/env');

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

const summarizer = {
  summarize: async (text) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash'});
    const prompt = `You are an AI assistant that summarizes GitHub development activity into a concise, human-friendly update. Given the task description, PR title, commits, and file changes, write a short report describing what was achieved, the main areas changed, and any notable technical aspects. The text to summarize is:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  },
};

module.exports = summarizer;
