const parser = {
  parsePR: (prData, commits, files, taskDetails) => {
    return {
      title: prData.title,
      description: prData.body,
      commits: commits.map(commit => commit.commit.message),
      files_changed: files.map(file => file.filename),
      task: taskDetails,
    };
  },
};

module.exports = parser;
