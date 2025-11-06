const parser = {
  parsePR: (prData, commits, files) => {
    return {
      title: prData.title,
      description: prData.body,
      commits: commits.map(commit => commit.commit.message),
      files_changed: files.map(file => file.filename),
    };
  },
};

module.exports = parser;
