/** @param {TrackingReport} report */
const summary = (report) => {
  if (report) {
    const { service } = report;
    if (service) {
      return {
        trackingService: service,
      };
    }
  }
};

module.exports = summary;
