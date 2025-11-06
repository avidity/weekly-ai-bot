const axios = require('axios');
const config = require('../config/env');

const slackNotifier = {
  notify: async (message) => {
    await axios.post(config.slackWebhookUrl, { text: message });
  },
};

module.exports = slackNotifier;
