const { scoreToGrade } = require("../utils");

/** @param {LighthouseReport} report */
const summary = (report) => {
  const { categories } = report || {};
  if (report && categories) {
    return Object.keys(categories).reduce((scores, key) => {
      const categoryKey = /** @type {LighthouseReportCategoryKey} */ (key);
      const { score } = categories[categoryKey];

      if (score !== undefined && score !== null) {
        return {
          ...scores,
          [`lighthouse_${key}`]: score,
          [`lighthouse_${key}Grade`]: scoreToGrade(score),
        };
      }
    }, {});
  }
};

module.exports = summary;
