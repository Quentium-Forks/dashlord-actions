/** @param {Wget404Report} report */
const summary = (report) => {
  if (report) {
    const links = report.map((item) => item.link);
    const grade = links.length > 20 ? "F" : links.length > 10 ? "D" : "A";
    return {
      "404Grade": grade,
      "404Count": links.length,
    };
  }
};

module.exports = summary;
