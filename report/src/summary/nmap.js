/** @param {number} count */
const getGrade = (count) => {
  if (count > 10) {
    return "F";
  } else if (count > 8) {
    return "E";
  } else if (count > 6) {
    return "D";
  } else if (count > 4) {
    return "C";
  } else if (count > 2) {
    return "B";
  } else if (count > 0) {
    return "A";
  } else {
    return "no-ports-open";
  }
};

/** @param {NmapReport} report */
const summary = (report) => {
  if (report) {
    const { grade, open_ports } = report;
    const portsGrade = open_ports ? getGrade(open_ports.length) : undefined;
    if (grade && open_ports) {
      return {
        nmapGrade: grade,
        nmapOpenPortsGrade: portsGrade,
        nmapOpenPortsCount: open_ports.length,
      };
    } else if (grade) {
      return {
        nmapGrade: grade,
      };
    } else if (open_ports) {
      return {
        nmapOpenPortsGrade: portsGrade,
        nmapOpenPortsCount: open_ports.length,
      };
    }
  }
};

module.exports = summary;
