/** @param {EcoIndexReport} report */
const summary = (report) => {
  if (report) {
    const row = report.length > 0 && report[0];
    const grade = row ? row.grade : undefined;
    if (grade) {
      return {
        ecoindexGrade: grade,
      };
    }
  }
};

module.exports = summary;
