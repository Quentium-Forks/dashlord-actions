/**
 * @param {number} critical
 * @param {number} high
 * @param {number} medium
 */
const getGrade = (critical, high, medium) => {
  if (critical > 10) {
    return "F";
  } else if (critical > 5) {
    return "E";
  } else if (critical > 0) {
    return "D";
  } else if (high > 10) {
    return "C";
  } else if (high > 0 || medium > 0) {
    return "B";
  } else {
    return "A";
  }
};

/** @param {TrivyReport} report */
const summary = (report) => {
  if (report && report.length) {
    if (report.filter((image) => image.ArtifactName).length === 0) {
      return;
    }
    const allVulns = report.flatMap(
      (image) =>
        (image &&
          image.Results &&
          image.Results.length &&
          image.Results.flatMap((res) => res.Vulnerabilities || [])) ||
        []
    );
    if (allVulns.length) {
      const critical = allVulns.filter((vuln) => vuln.Severity === "CRITICAL").length;
      const high = allVulns.filter((vuln) => vuln.Severity === "HIGH").length;
      const medium = allVulns.filter((vuln) => vuln.Severity === "MEDIUM").length;
      const grade = getGrade(critical, high, medium);
      if (grade) {
        return {
          trivyGrade: grade,
          trivyCount: allVulns.length,
        };
      }
    }
  }
};

module.exports = summary;
