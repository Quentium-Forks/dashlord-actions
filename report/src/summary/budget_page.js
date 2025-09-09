/** @param {PageReport} report */
const summary = (report) => {
  if (report) {
    const { grade } = report;
    if (grade) {
      return {
        budgetPageGrade: grade,
      };
    }
  }
};

module.exports = summary;
