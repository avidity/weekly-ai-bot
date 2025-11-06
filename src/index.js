const logger = require('./utils/logger');
const githubClient = require('./github/client');
const parser = require('./github/parser');
const githubProject = require('./github/project');
const summarizer = require('./ai/summarizer');
const slackNotifier = require('./slack/notifier');

const parseRepoUrl = (repoUrl) => {
  let match = repoUrl.match(/github.com[\/|:]([^\/]+)\/([^\/\.]+)/);
  if (!match) {
    return null;
  }
  return {
    owner: match[1],
    repo: match[2],
  };
};

const main = async () => {
  logger.info('Starting the weekly AI bot...');

  const args = process.argv.slice(2);
  const repoIndex = args.findIndex(arg => arg === '--repo');
  const periodIndex = args.findIndex(arg => arg === '--period');

  const repoUrl = repoIndex !== -1 ? args[repoIndex + 1] : null;
  const period = periodIndex !== -1 ? parseInt(args[periodIndex + 1], 10) : 7;

  if (!repoUrl) {
    logger.error('Missing --repo argument.');
    return;
  }

  logger.info(`Repo URL: ${repoUrl}`);
  logger.info(`Period: ${period} days`);

  const repoDetails = parseRepoUrl(repoUrl);
  if (!repoDetails) {
    logger.error('Invalid repo URL.');
    return;
  }

  logger.info(`Owner: ${repoDetails.owner}, Repo: ${repoDetails.repo}`);

  try {
    const prs = await githubClient.getPRs(repoDetails.owner, repoDetails.repo, period);
    logger.info(`Found ${prs.length} PRs.`);

    const allPrData = await Promise.all(
      prs.map(async (pr) => {
        const prNumber = pr.number;
        const [prData, commits, files] = await Promise.all([
          githubClient.getPRDetails(repoDetails.owner, repoDetails.repo, prNumber),
          githubClient.getPRCommits(repoDetails.owner, repoDetails.repo, prNumber),
          githubClient.getPRFiles(repoDetails.owner, repoDetails.repo, prNumber),
        ]);
        const taskDetails = await githubProject.getTaskDetails(repoDetails.owner, repoDetails.repo, prData.body);
        return parser.parsePR(prData, commits, files, taskDetails);
      })
    );

    const summaryText = allPrData.map(prData => {
      let taskInfo = 'No linked task';
      if (prData.task) {
        taskInfo = `
        Linked Task: #${prData.task.taskNumber} - ${prData.task.title}
        Task Description: ${prData.task.description}
        `;
      }

      return `
        PR Title: ${prData.title}
        PR Description: ${prData.description}
        ${taskInfo}
        Commits: ${prData.commits.join(', ')}
        Files Changed: ${prData.files_changed.join(', ')}
      `;
    }).join('\n');

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
