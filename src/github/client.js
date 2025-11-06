const axios = require('axios');
const config = require('../config/env');

const githubClient = {
  getPRs: async (owner, repo, period) => {
    const date = new Date();
    date.setDate(date.getDate() - period);
    const dateString = date.toISOString().split('T')[0];

    const url = `https://api.github.com/search/issues?q=repo:${owner}/${repo}+is:pr+updated:>=${dateString}`;
    const headers = {
      Authorization: `token ${config.githubToken}`,
      'User-Agent': 'github-weekly-ai-bot'
    };

    const response = await axios.get(url, { headers });
    return response.data.items;
  },

  getPRDetails: async (owner, repo, prNumber) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`;
    const headers = {
      Authorization: `token ${config.githubToken}`,
      'User-Agent': 'github-weekly-ai-bot'
    };

    const response = await axios.get(url, { headers });
    return response.data;
  },

  getPRCommits: async (owner, repo, prNumber) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/commits`;
    const headers = {
      Authorization: `token ${config.githubToken}`,
      'User-Agent': 'github-weekly-ai-bot'
    };

    const response = await axios.get(url, { headers });
    return response.data;
  },

  getPRFiles: async (owner, repo, prNumber) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`;
    const headers = {
      Authorization: `token ${config.githubToken}`,
      'User-Agent': 'github-weekly-ai-bot'
    };

    const response = await axios.get(url, { headers });
    return response.data;
  },

  getIssueDetails: async (owner, repo, issueNumber) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;
    const headers = {
      Authorization: `token ${config.githubToken}`,
      'User-Agent': 'github-weekly-ai-bot'
    };

    const response = await axios.get(url, { headers });
    return response.data;
  },
};

module.exports = githubClient;
