/**
 * @param {number} vulnerabilities
 * @param {number} bugs
 * @param {number} codeSmells
 */
const getGrade = (vulnerabilities, bugs, codeSmells) => {
  if (vulnerabilities > 10 || bugs > 50) {
    return "F";
  } else if (vulnerabilities > 0) {
    return "E";
  } else if (bugs > 10) {
    return "D";
  } else if (bugs > 0) {
    return "C";
  } else if (codeSmells > 0) {
    return "B";
  } else {
    return "A";
  }
};

/**
 * @param {number[]} arr
 * @returns {number}
 */
const sum = (arr) => arr.reduce((a, c) => a + c, 0);

/** @param {SonarCloudReport} report */
const summary = (report) => {
  if (report && report.length) {
    const bugs = sum(report.map((repo) => repo.result.status.bugs));
    const vulnerabilities = sum(report.map((repo) => repo.result.status.vulnerabilities));
    const codeSmells = sum(report.map((repo) => repo.result.status.codeSmells));
    const gateFailed = report.filter((repo) => repo.result.status?.qualityGateStatus === "ERROR").length > 0;
    const gateSuccess = report.filter((repo) => repo.result.status?.qualityGateStatus === "OK").length === report.length;
    if (gateFailed) {
      return {
        sonarcloudGrade: "F",
      };
    } else if (gateSuccess) {
      return {
        sonarcloudGrade: "A",
      };
    }
    const grade = getGrade(vulnerabilities, bugs, codeSmells);
    if (grade) {
      return {
        sonarcloudGrade: grade,
      };
    }
  }
};

module.exports = summary;
