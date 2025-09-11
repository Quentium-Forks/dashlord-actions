const SONARCLOUD_API_ROOT =
  process.env.SONARCLOUD_API_ROOT || "https://sonarcloud.io/api";

const SONARCLOUD_API_TOKEN = process.env.SONARCLOUD_API_TOKEN || "";

const qs = (obj = {}) =>
  Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

/**
 *
 * @param {string} path
 * @param {object} [params]
 * @returns
 */
const sonarApi = (path, params = {}, method = "GET") =>
  fetch(`${SONARCLOUD_API_ROOT}/${path}?${qs(params)}`, {
    headers: {
      Authorization: `Bearer ${SONARCLOUD_API_TOKEN}`,
    },
    method,
  }).then((r) => r.json());

/**
 *
 * @param {string[]} projects
 * @returns
 */
const generateJson = async (projects) => {
  const queries = await Promise.all(
    projects.map((project) =>
      sonarApi("project_branches/list", {
        project: project,
      }).then((result) => {
        if (result.errors && result.errors.length) {
          console.error(`Invalid result for ${project}`);
          return null;
        }
        const mainBranch =
          result.branches &&
          result.branches.find(
            /** @param {any} branch */
            (branch) => branch.isMain
          );

        if (!mainBranch) {
          return null;
        }

        return {
          project,
          result: {
            ...mainBranch,
            commit: {
              ...mainBranch.commit,
              author: undefined, //anonymify
            },
          },
        };
      })
    )
  );

  return queries.filter(Boolean);
};

module.exports = generateJson;

if (require.main === module) {
  const projects = process.argv[process.argv.length - 1];
  if (projects.match(/^([\w-]+)(,[\w-]+)*$/)) {
    generateJson(projects.split(",").map((project) => project.trim())).then((results) =>
      console.log(JSON.stringify(results, null, 2))
    );
  } else {
    console.error("USAGE: index.js <company>_<project>,<project_id>,<company>-<project>-<version>");
  }
}
