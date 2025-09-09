/** @param {PageReport} report */
const summary = (report) => {
  if (report) {
    const { grade } = report;
    if (grade) {
      return {
        githubRepositoryGrade: grade,
      };
    }
  }
};

module.exports = summary;
