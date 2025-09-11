/** @param {SslTestReport} report */
const summary = (report) => {
  if (report && report.length) {
    const overallGrade = report.find((entry) => entry.id === "overall_grade");
    const grade = overallGrade && overallGrade.finding;

    const notAfterNode = report.find((entry) => entry.id === "cert_notAfter");
    const notAfterIntermediateNode = report.find(
      (r) => r.id === "intermediate_cert_notAfter <#1>"
    );

    // warn a month before
    const warningDelay = 30 * 24 * 60 * 60 * 1000;
    let expirationDate = undefined;
    if (notAfterNode) {
      if (notAfterIntermediateNode) {
        const closest = Math.min(
          new Date(notAfterNode.finding).getTime(),
          new Date(notAfterIntermediateNode.finding).getTime()
        );
        expirationDate = closest;
      } else {
        expirationDate = new Date(notAfterNode.finding).getTime();
      }
    }

    const expireSoon = expirationDate && new Date().getTime() + warningDelay > expirationDate;

    if (grade && expirationDate) {
      let expireDate = new Date();
      expireDate.setTime(expirationDate);
      return {
        testsslExpireSoon: expireSoon,
        testsslExpireDate: expireDate.toISOString(),
        testsslGrade: grade,
      };
    } else if (grade) {
      return {
        testsslGrade: grade,
      };
    }
  }
};

module.exports = summary;
