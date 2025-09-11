/** @param {number} count */
const getGrade = (count) => {
  if (count > 20) {
    return "F";
  } else if (count > 15) {
    return "E";
  } else if (count > 10) {
    return "D";
  } else if (count > 5) {
    return "C";
  } else if (count > 0) {
    return "B";
  } else {
    return "A";
  }
};

/** @param {Wget404Report} report */
const summary = (report) => {
  if (report) {
    const links = report.map((item) => item.link);
    const grade = getGrade(links.length);
    if (grade) {
      return {
        "404Grade": grade,
        "404Count": links.length,
      };
    }
  }
};

module.exports = summary;
