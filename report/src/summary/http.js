/** @param {HttpReport} report */
const summary = (report) => {
  if (report) {
    // @ts-ignore use legacy value
    const grade = report.grade ?? report.scan?.grade;
    // @ts-ignore use legacy value
    const date = report?.response_headers?.Date ?? report.scan?.responseHeaders?.date;
    if (grade) {
      return {
        httpGrade: grade,
        httpDate: date ? new Date(date).toISOString() : undefined,
      };
    }
  }
};

module.exports = summary;
