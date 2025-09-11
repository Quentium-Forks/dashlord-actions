const summary = require("./declaration-rgpd");

const tests = [
  {
    name: "ML & PC undefined",
    report: [
      {
        slug: "ml",
        declarationUrl: undefined,
      },
      {
        slug: "pc",
        declarationUrl: undefined,
      },
    ],
    expected: { "declaration_rgpd-mlGrade": "F", "declaration_rgpd-pcGrade": "F" },
  },
  {
    name: "ML undefined & PC incomplete",
    report: [
      {
        slug: "ml",
        declarationUrl: undefined,
      },
      {
        slug: "pc",
        declarationUrl: "https://incomplete-pc.test",
        maxScore: 4,
        score: 3,
      },
    ],
    expected: { "declaration_rgpd-mlGrade": "F", "declaration_rgpd-pcGrade": "D" },
  },
  {
    name: "ML incomplete & PC undefined",
    report: [
      {
        slug: "ml",
        declarationUrl: "https://incomplete-ml.test",
        maxScore: 4,
        score: 3,
      },
      {
        slug: "pc",
        declarationUrl: undefined,
      },
    ],
    expected: { "declaration_rgpd-mlGrade": "D", "declaration_rgpd-pcGrade": "F" },
  },
  {
    name: "ML incomplete & PC incomplete",
    report: [
      {
        slug: "ml",
        declarationUrl: "https://incomplete-ml.test",
        maxScore: 4,
        score: 0,
      },
      {
        slug: "pc",
        declarationUrl: "https://incomplete-pc.test",
        maxScore: 4,
        score: 2,
      },
    ],
    expected: { "declaration_rgpd-mlGrade": "D", "declaration_rgpd-pcGrade": "D" },
  },
  {
    name: "ML valid & PC incomplete",
    report: [
      {
        slug: "ml",
        declarationUrl: "https://valid-ml.test",
        maxScore: 4,
        score: 4,
      },
      {
        slug: "pc",
        declarationUrl: "https://incomplete-pc.test",
        maxScore: 4,
        score: 2,
      },
    ],
    expected: { "declaration_rgpd-mlGrade": "A", "declaration_rgpd-pcGrade": "D" },
  },
  {
    name: "ML incomplete & PC valid",
    report: [
      {
        slug: "ml",
        declarationUrl: "https://incomplete-ml.test",
        maxScore: 4,
        score: 3,
      },
      {
        slug: "pc",
        declarationUrl: "https://valid-pc.test",
        maxScore: 6,
        score: 6,
      },
    ],
    expected: { "declaration_rgpd-mlGrade": "D", "declaration_rgpd-pcGrade": "A" },
  },
  {
    name: "ML valid & PC valid",
    report: [
      {
        slug: "ml",
        declarationUrl: "https://valid-ml.test",
        maxScore: 3,
        score: 3,
      },
      {
        slug: "pc",
        declarationUrl: "https://valid-pc.test",
        maxScore: 1,
        score: 1,
      },
    ],
    expected: { "declaration_rgpd-mlGrade": "A", "declaration_rgpd-pcGrade": "A" },
  },
  {
    name: "ML undefined & PC valid",
    report: [
      {
        slug: "ml",
        declarationUrl: undefined,
      },
      {
        slug: "pc",
        declarationUrl: "https://valid-pc.test",
        maxScore: 1,
        score: 1,
      },
    ],
    expected: { "declaration_rgpd-mlGrade": "F", "declaration_rgpd-pcGrade": "A" },
  },
  {
    name: "ML valid & PC undefined",
    report: [
      {
        slug: "ml",
        declarationUrl: "https://valid-ml.test",
        maxScore: 1,
        score: 1,
      },
      {
        slug: "pc",
        declarationUrl: undefined,
      },
    ],
    expected: { "declaration_rgpd-mlGrade": "A", "declaration_rgpd-pcGrade": "F" },
  },
  {
    name: "Invalid report 1",
    report: {},
    expected: undefined,
  },
  {
    name: "Invalid report 2",
    report: null,
    expected: undefined,
  },
];

describe("declaration-rgpd", () => {
  tests.forEach((t) => {
    test(`${t.name} should return ${JSON.stringify(t.expected)}`, () => {
      //@ts-expect-error
      expect(summary(t.report)).toEqual(t.expected);
    });
  });
});
