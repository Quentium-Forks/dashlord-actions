/**
 * @param {number} score
 * @param {number} maxScore
 */
const getGrade = (score, maxScore) => {
  if (maxScore === 0) {
    return "F";
  }
  const ratio = score / maxScore;
  if (ratio === 1) {
    return "A";
  } else if (ratio >= 0.75) {
    return "B";
  } else if (ratio >= 0.5) {
    return "C";
  } else if (ratio >= 0.25) {
    return "D";
  } else {
    return "E";
  }
};

/** @param {DeclarationRgpdReport} report */
const summary = (report) => {
  if (report && report.length) {
    return report.reduce((/** @type {Record<string, string>} */ acc, result) => {
      const { score, maxScore, declarationUrl, slug } = result;

      let grade = "F";
      if (declarationUrl) {
        grade = getGrade(score, maxScore);
      }

      acc[`declaration_rgpd-${slug}Grade`] = grade;

      return acc;
    }, {});
  }
};

module.exports = summary;
