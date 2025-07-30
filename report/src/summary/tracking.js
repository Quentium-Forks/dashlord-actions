/** @param {TrackingReport} report */
const summary = (report) => {
  if (report) {
    const trackingService = report.service;
    if (trackingService) {
      return {
        trackingService,
      };
    }
  }
};

module.exports = summary;
