const axios = require('axios');
const config = require('../config/env');

const githubClient = {
  getPRDetails: async (org, repo, prNumber) => {
    const url = `https://api.github.com/repos/${org}/${repo}/pulls/${prNumber}`;
    const headers = {
      Authorization: `token ${config.githubToken}`,
      'User-Agent': 'github-weekly-ai-bot'
    };

    const response = await axios.get(url, { headers });
    return response.data;
  },

  getPRCommits: async (org, repo, prNumber) => {
    const url = `https://api.github.com/repos/${org}/${repo}/pulls/${prNumber}/commits`;
    const headers = {
      Authorization: `token ${config.githubToken}`,
      'User-Agent': 'github-weekly-ai-bot'
    };

    const response = await axios.get(url, { headers });
    return response.data;
  },

  getPRFiles: async (org, repo, prNumber) => {
    const url = `https://api.github.com/repos/${org}/${repo}/pulls/${prNumber}/files`;
    const headers = {
      Authorization: `token ${config.githubToken}`,
      'User-Agent': 'github-weekly-ai-bot'
    };

    const response = await axios.get(url, { headers });
    return response.data;
  },
};

module.exports = githubClient;
