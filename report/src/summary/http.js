/** @param {HttpReport} report */
const summary = (report) => {
  if (report) {
    // @ts-ignore use legacy value
    const { grade } = report || report.scan;
    if (grade) {
      return {
        httpGrade: grade,
      };
    }
  }
};

module.exports = summary;
