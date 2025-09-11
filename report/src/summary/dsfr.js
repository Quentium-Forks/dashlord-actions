/** @param {DsFrReport} report */
const summary = (report) => {
  if (report) {
    const grade = report.detected === true ? "A" : report.detected === false ? "F" : undefined;
    if (grade) {
      return {
        dsfrGrade: grade,
      };
    }
  }
};

module.exports = summary;
