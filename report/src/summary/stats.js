/** @param {PageReport} report */
const summary = (report) => {
  if (report) {
    const { grade } = report;
    if (grade) {
      return {
        statsGrade: grade,
      };
    }
  }
};

module.exports = summary;
