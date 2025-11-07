const express = require('express');
const { exec } = require('child_process');
const logger = require('../utils/logger');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/summarize', (req, res) => {
  const text = req.body?.text;

  if (!text) {
    return res.status(400).json({ error: 'Missing text parameter.' });
  }

  const parts = text.trim().split(/\s+/);
  if (parts.length < 2) {
    return res.status(400).json({ error: 'Use the format: "/summary 7 https://github.com/org/repo"' });
  }

  const [period, repoUrl] = parts;
  const command = `node src/index.js --repo ${repoUrl} --period ${period}`;
  logger.info(`Executing command: ${command}`);

  // ✅ Respond immediately to Slack
  res.status(200).send(`⏳ Got it! Generating summary for *${repoUrl}* (last ${period} days)...`);

  // Then do the work asynchronously
  exec(command, (error, stdout, stderr) => {
    if (error) {
      logger.error(`Execution error: ${error.message}`);
      return;
    }

    const summaryMatch = stdout.match(/Summary:\s*([\s\S]*?)Summary sent to Slack/);
    const summary = summaryMatch ? summaryMatch[1].trim() : 'Could not parse summary from output.';

    // Optional: log it locally
    logger.info('Summary generated:', summary);
  });
});


app.listen(port, () => {
  logger.info(`API server listening at http://localhost:${port}`);
});
