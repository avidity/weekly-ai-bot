const logger = require('./utils/logger');
const githubClient = require('./github/client');
const parser = require('./github/parser');
const summarizer = require('./ai/summarizer');
const slackNotifier = require('./slack/notifier');

const parsePrUrl = (prUrl) => {
  const match = prUrl.match(/github.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);
  if (!match) {
    return null;
  }
  return {
    org: match[1],
    repo: match[2],
    prNumber: match[3],
  };
};

const main = async () => {
  logger.info('Starting the weekly AI bot...');

  const args = process.argv.slice(2);
  const taskIndex = args.findIndex(arg => arg === '--task');
  const prIndex = args.findIndex(arg => arg === '--pr');

  const task = taskIndex !== -1 ? args[taskIndex + 1] : null;
  const prUrl = prIndex !== -1 ? args[prIndex + 1] : null;

  if (!task || !prUrl) {
    logger.error('Missing --task or --pr argument.');
    return;
  }

  logger.info(`Task: ${task}`);
  logger.info(`PR URL: ${prUrl}`);

  const prDetails = parsePrUrl(prUrl);
  if (!prDetails) {
    logger.error('Invalid PR URL.');
    return;
  }

  try {
    const [prData, commits, files] = await Promise.all([
      githubClient.getPRDetails(prDetails.org, prDetails.repo, prDetails.prNumber),
      githubClient.getPRCommits(prDetails.org, prDetails.repo, prDetails.prNumber),
      githubClient.getPRFiles(prDetails.org, prDetails.repo, prDetails.prNumber),
    ]);

    const parsedData = parser.parsePR(prData, commits, files);
    
    const summaryText = `
      Task: ${task}
      PR Title: ${parsedData.title}
      PR Description: ${parsedData.description}
      Commits: ${parsedData.commits.join(', ')}
      Files Changed: ${parsedData.files_changed.join(', ')}
    `;

    const summary = await summarizer.summarize(summaryText);
    logger.info('Summary:');
    console.log(summary);

    await slackNotifier.notify(summary);
    logger.info('Summary sent to Slack.');

  } catch (error) {
    logger.error(`Error: ${error.message}`);
  }
};

main();
