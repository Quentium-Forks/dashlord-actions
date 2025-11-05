/** @param {HttpReport} report */
const summary = (report) => {
  if (report) {
    if (report.error) {
      return {
        httpGrade: 'G',
        httpDate: new Date().toISOString(),
      };
    }
    // @ts-ignore use legacy value
    const grade = report.grade ?? report.scan?.grade;
    // @ts-ignore use legacy value
    const date = report?.response_headers?.Date ?? report.scan?.responseHeaders?.date;
    if (grade) {
      const dateFixTimezone = date ? date.replace(/ [A-Z]{3,4}$/, ' GMT') : null;
      return {
        httpGrade: grade,
        httpDate: new Date(dateFixTimezone).toISOString(),
      };
    }
  }
};

module.exports = summary;
