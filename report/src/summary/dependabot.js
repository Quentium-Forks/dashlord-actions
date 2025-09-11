/** @param {DependabotReport} report */
const summary = (report) => {
  if (report) {
    const { grade, totalCount } = report;
    if (grade && totalCount !== undefined && totalCount !== null) {
      return {
        dependabotGrade: grade,
        dependabotCount: totalCount,
      };
    } else if (grade) {
      return {
        dependabotGrade: grade,
      };
    } else if (totalCount !== undefined && totalCount !== null) {
      return {
        dependabotCount: totalCount,
      };
    }
  }
};

module.exports = summary;
