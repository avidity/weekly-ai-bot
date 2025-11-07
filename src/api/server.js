const express = require('express');
const { exec } = require('child_process');
const logger = require('../utils/logger');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/summarize', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'The "text" parameter is missing.' });
  }

  const parts = text.split(' ');
  if (parts.length < 2) {
    return res.status(400).json({ error: 'The "text" parameter must be in the format "[period] [repo_url]".' });
  }

  const [period, repoUrl] = parts;

  const command = `node src/index.js --repo ${repoUrl} --period ${period}`;
  logger.info(`Executing command: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      logger.error(`Execution error: ${error.message}`);
      return res.status(500).json({ error: 'Failed to execute the summarizer.', details: stderr });
    }

    // The summary is logged to the console, so we extract it from stdout.
    const summaryMatch = stdout.match(/Summary:\s*([\s\S]*?)Summary sent to Slack/);
    const summary = summaryMatch ? summaryMatch[1].trim() : 'Could not parse summary from output.';
    
    res.status(200).json({ summary });
  });
});

app.listen(port, () => {
  logger.info(`API server listening at http://localhost:${port}`);
});
