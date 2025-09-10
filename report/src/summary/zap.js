/** @param {ZapReportSiteAlert} row */
const getGrade = (row) => ({
  0: "A", // info
  1: "B", // low
  2: "D", // medium
  3: "F", // high
})[row.riskcode] || "A";

/** @param {ZapReport} report */
const summary = (report) => {
  const { site } = report || {};
  if (report && site && site.length) {
    const { alerts } = site[0];
    if (alerts.length) {
      const maxCritic = alerts.sort((a, b) => b.riskcode.localeCompare(a.riskcode))[0];
      const grade = getGrade(maxCritic);
      const risks = alerts.filter((a) => a.riskcode !== "0");
      if (grade) {
        return {
          zapGrade: grade,
          zapCount: risks.length,
        };
      }
    }
  }
};

module.exports = summary;
