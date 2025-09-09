/** @param {DeclarationRgpdReport} report */
const summary = (report) => {
  if (report && report.length) {
    const summaryMap = report.map((result) => {
      let grade = "F";

      if (result.declarationUrl) {
        grade = "D";

        if (result.score === result.maxScore) {
          grade = "A";
        }
      }

      return [`declaration_rgpd-${result.slug}Grade`, grade];
    });

    return Object.fromEntries(summaryMap);
  }
};

module.exports = summary;
