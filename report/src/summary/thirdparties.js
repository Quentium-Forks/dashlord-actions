/** @param {number} count */
const getGrade = (count) => {
  if (count > 10) {
    return "F";
  } else if (count > 7) {
    return "E";
  } else if (count > 4) {
    return "D";
  } else if (count > 2) {
    return "C";
  } else if (count > 0) {
    return "B";
  } else {
    return "A";
  }
};

/** @param {ThirdPartiesReport} report */
const summary = (report) => {
  if (report) {
    const { cookies, trackers } = report;
    const cookiesGrade = getGrade(cookies?.length);
    const trackersGrade = getGrade(trackers?.length);
    if (cookies && trackers) {
      return {
        cookiesGrade: cookiesGrade,
        cookiesCount: cookies.length,
        trackersGrade: trackersGrade,
        trackersCount: trackers.length,
      };
    } else if (cookies) {
      return {
        cookiesGrade: cookiesGrade,
        cookiesCount: cookies.length,
      };
    } else if (trackers) {
      return {
        trackersGrade: trackersGrade,
        trackersCount: trackers.length,
      };
    }
  }
};

module.exports = summary;
