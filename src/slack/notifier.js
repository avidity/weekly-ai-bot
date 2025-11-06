const axios = require('axios');
const config = require('../config/env');

const slackNotifier = {
  notify: async (message) => {
    await axios.post(config.slackWebhookUrl, {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message,
          },
        },
      ],
    });
  },
};

module.exports = slackNotifier;
