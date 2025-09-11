const { scoreToGrade } = require("../utils");

/** @param {LighthouseReport} report */
const summary = (report) => {
  if (report) {
    const row = report.length > 0 && report[0];
    const categories = row ? row.categories : undefined;
    if (categories) {
      return Object.keys(categories).reduce((scores, key) => {
        const categoryKey = /** @type {LighthouseReportCategoryKey} */ (key);
        const { score } = categories[categoryKey];

        return {
          ...scores,
          [`lighthouse_${key}`]: score || 0,
          [`lighthouse_${key}Grade`]: score ? scoreToGrade(score) : "F",
        };
      }, {});
    }
  }
};

module.exports = summary;
