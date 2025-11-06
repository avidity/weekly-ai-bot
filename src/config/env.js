require('dotenv').config();

const config = {
  githubToken: process.env.GITHUB_TOKEN,
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
  geminiApiKey: process.env.GEMINI_API_KEY,
};

module.exports = config;
