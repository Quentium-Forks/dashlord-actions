const fs = require("fs");
const path = require("path");
const core = require("@actions/core");

const sampleConfig = jest
  .requireActual("fs")
  .readFileSync(path.join(__dirname, "..", "dashlord.yml"))
  .toString();

jest.mock("fs", () => {
  const actualFs = jest.requireActual("fs");
  return {
    ...actualFs,
    promises: {
      access: jest.fn(),
    },
    existsSync: jest.fn(),
    readFileSync: jest.fn(),
    constants: actualFs.constants, // preserve constants like O_RDONLY
  };
});

const { getOutputs, getSiteTools, getSiteSubpages } = require("./index");

let inputs = {};

describe("should parse dashlord config", () => {
  beforeAll(() => {
    // Mock getInput
    jest.spyOn(core, "getInput").mockImplementation((name) => {
      return inputs[name];
    });
  });
  beforeEach(() => {
    // Reset inputs
    jest.resetAllMocks();

    inputs = {};
  });
  test("when no input", async () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("when single invalid url input", async () => {
    inputs.url = "zfzef";
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("when single valid url input", async () => {
    inputs.url = "https://www.free.fr";
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("when multiple urls input", async () => {
    inputs.url = "https://www.free.fr,pouet,http://chez.com";
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });

  test("and getSiteTools https://chez.com match", async () => {
    inputs.url = "https://chez.com";
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const tools = getSiteTools({
      url: "https://chez.com",
      repositories: ["chez/chez-ui", "chez/chez-api"],
      tools: {
        screenshot: false,
        updownio: false,
        stats: false,
        budget_page: false,
        testssl: true,
      },
    });
    core.info(`tools=${JSON.stringify(tools)}`);
    expect(tools).toEqual({
      404: true,
      budget_page: false,
      codescan: true,
      "declaration-a11y": true,
      "declaration-rgpd": true,
      dependabot: true,
      dsfr: true,
      ecoindex: true,
      http: true,
      lighthouse: true,
      nmap: true,
      nuclei: false,
      screenshot: false,
      stats: false,
      testssl: true,
      thirdparties: true,
      updownio: false,
      wappalyzer: true,
      zap: true,
    });
  });

  test("and getSiteSubpages https://chez.com match", async () => {
    inputs.url = "https://chez.com";
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const subpages = getSiteSubpages({
      url: "https://chez.com",
      pages: ["login", "profile"],
      repositories: ["chez/chez-ui", "chez/chez-api"],
      tools: {
        screenshot: false,
        updownio: false,
        stats: false,
        budget_page: false,
        testssl: true,
      },
    });
    core.info(`subpages=${JSON.stringify(subpages)}`);
    expect(subpages).toEqual([
      "https://chez.com",
      "https://chez.com/login",
      "https://chez.com/profile",
    ]);
  });

  test("and getSiteSubpages https://voila.fr match", async () => {
    inputs.url = "https://voila.fr";
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const subpages = getSiteSubpages({
      url: "https://voila.fr",
    });
    core.info(`subpages=${JSON.stringify(subpages)}`);
    expect(subpages).toEqual(["https://voila.fr"]);
  });

  test("with inputs.tool", async () => {
    inputs.url = "https://voila.fr";
    inputs.tool = "lighthouse";
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(sampleConfig);
    const outputs = getOutputs();
    expect(outputs.sites).toMatchSnapshot();
  });
});
