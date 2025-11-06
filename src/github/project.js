const axios = require('axios');
const config = require('../config/env');
const githubClient = require('./client');

const githubProject = {
  getTaskDetails: async (owner, repo, prBody) => {
    // Regex to find issue numbers like #123
    const issueNumberRegex = /#(\d+)/;
    const match = prBody.match(issueNumberRegex);

    if (match) {
      const issueNumber = match[1];
      const issueDetails = await githubClient.getIssueDetails(owner, repo, issueNumber);
      return {
        taskNumber: issueNumber,
        title: issueDetails.title,
        description: issueDetails.body,
      };
    }

    return null;
  },
};

module.exports = githubProject;
