const summary = require("./declaration-a11y");

const tests = [
  {
    mention: undefined,
    expected: undefined,
  },
  {
    mention: null,
    expected: undefined,
  },
  {
    mention: "Accessibilité : totalement conforme",
    expected: { "declaration_a11yGrade": "F" },
  },
  {
    mention: "Accessibilité : partiellement conforme",
    expected: { "declaration_a11yGrade": "F" },
  },
  {
    mention: "Accessibilité : non conforme",
    expected: { "declaration_a11yGrade": "D" },
  },
  {
    mention: "Accessibilité : totalement conforme",
    declarationUrl: "https://declaration.url",
    expected: { "declaration_a11yGrade": "A" },
  },
  {
    mention: "Accessibilité : partiellement conforme",
    declarationUrl: "https://declaration.url",
    expected: { "declaration_a11yGrade": "B" },
  },
  {
    mention: "Accessibilité : non conforme",
    declarationUrl: "https://declaration.url",
    expected: { "declaration_a11yGrade": "C" },
  },
];

describe("declaration-a11y", () => {
  tests.forEach((t) => {
    test(`${t.mention} should return ${JSON.stringify(t.expected)}`, () => {
      //@ts-expect-error
      expect(summary(t)).toEqual(t.expected);
    });
  });
});
