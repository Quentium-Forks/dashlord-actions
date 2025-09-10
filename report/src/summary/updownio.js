/** @param {UpDownReport} report */
const summary = (report) => {
  if (report) {
    const { uptime, metrics, uptimeGrade, apdexGrade } = report;
    const apdex = metrics?.apdex;
    if (uptime !== undefined && uptime !== null) {
      return {
        apdex: apdex,
        apdexGrade: apdexGrade,
        uptime: uptime,
        uptimeGrade: uptimeGrade,
      };
    }
  }
};

module.exports = summary;
