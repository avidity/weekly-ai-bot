const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/env');

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

const summarizer = {
  summarize: async (text) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `
      You are an expert AI assistant specializing in summarizing a period's worth of software development work for a non-technical audience.
      Your goal is to generate a single, clear, concise, and engaging summary based on the provided list of Pull Requests and their associated tasks.
      Use the following template and adhere to the instructions for each section.

      *✨ [Highlight Title]*
      *A brief, engaging summary of the key accomplishments from the entire period. This should be a single, impactful sentence.*

      *🎯 Goal*
      What was the primary objective for the period? Infer this from the collection of PRs. (e.g., "Improve user login speed," "Fix critical payment bugs," "Release version 2.1 of the dashboard.")

      *🚀 What's New*
      Provide a bulleted list of the most important changes from a user's perspective. Synthesize information from all the PRs.
      - Change 1
      - Change 2
      - ...

      *📈 Impact*
      Describe the overall outcome of this work. (e.g., "Reduces login time by 50%," "Prevents incorrect charges for customers," "The new dashboard is now live for all users.")

      *🔗 Details*
      You can optionally list the PRs or tasks that were completed.

      ---
      **Raw Data from Pull Requests for the Period:**
      ${text}
      ---

      Generate a single, cohesive summary now based on all the data provided.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  },
};

module.exports = summarizer;
