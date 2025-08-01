const tools = {
  /** @param {Wget404Report} report */
  404: (report) => require("./404")(report),
  /** @param {PageReport} report */
  budget_page: (report) => require("./budget_page")(report),
  /** @param {CodescanReport} report */
  codescan: (report) => require("./codescan")(report),
  /** @param {DeclarationA11yReport} report */
  "declaration-a11y": (report) => require("./declaration-a11y")(report),
  /** @param {DeclarationRgpdReport} report */
  "declaration-rgpd": (report) => require("./declaration-rgpd")(report),
  /** @param {DependabotReport} report */
  dependabot: (report) => require("./dependabot")(report),
  /** @param {DsFrReport} report */
  dsfr: (report) => require("./dsfr")(report),
  /** @param {EcoIndexReport} report */
  ecoindex: (report) => require("./ecoindex")(report),
  /** @param {PageReport} report */
  github_repository: (report) => require("./github_repository")(report),
  /** @param {HttpReport} report */
  http: (report) => require("./http")(report),
  /** @param {LighthouseReport} report */
  lhr: (report) => require("./lighthouse")(report),
  /** @param {NmapReport} report */
  nmap: (report) => require("./nmap")(report),
  /** @param {SonarCloudReport} report */
  sonarcloud: (report) => require("./sonarcloud")(report),
  /** @param {PageReport} report */
  stats: (report) => require("./stats")(report),
  /** @param {SslTestReport} report */
  testssl: (report) => require("./testssl")(report),
  /** @param {ThirdPartiesReport} report */
  thirdparties: (report) => require("./thirdparties")(report),
  /** @param {UpDownReport} report */
  updownio: (report) => require("./updownio")(report),
  /** @param {TrackingReport} report */
  tracking: (report) => require("./tracking")(report),
  /** @param {TrivyReport} report */
  trivy: (report) => require("./trivy")(report),
  /** @param {ZapReport} report */
  zap: (report) => require("./zap")(report),
};

/**
 * @param {UrlReport} urlReport
 *
 * @returns {UrlReportSummary}
 */
const computeSummary = (urlReport) => {
  /** @type {Record<string,any>} */
  let summary = {};
  Object.keys(urlReport).forEach((key) => {
    if (key in tools) {
      summary = {
        ...summary,
        //@ts-expect-error
        ...(tools[key](urlReport[key]) || {}),
      };
    }
  });
  return summary;
};

module.exports = { computeSummary };
