const generateJson = require("../src/index");

test("get results from sonarcloud", async () => {
  const result = await generateJson(["microsoft_kiota", "sonarlint-visualstudio", "aws_aws-sdk-java-v2"]);
  expect(result.length).toEqual(3);
  expect(result[0].result.status.vulnerabilities).toBeGreaterThan(0);
  expect(result[1].result.status.vulnerabilities).toBeGreaterThan(0);
  expect(result[2].result.status.vulnerabilities).toBeGreaterThan(0);
});
