/** @param {CodescanReport} report */
const summary = (report) => {
  if (report) {
    const { grade, totalCount } = report;
    if (grade && totalCount !== undefined && totalCount !== null) {
      return {
        codescanGrade: grade,
        codescanCount: totalCount,
      };
    } else if (grade) {
      return {
        codescanGrade: grade,
      };
    } else if (totalCount !== undefined && totalCount !== null) {
      return {
        codescanCount: totalCount,
      };
    }
  }
};

module.exports = summary;
