const grades = {
  A: "Accessibilité : totalement conforme",
  B: "Accessibilité : partiellement conforme",
  C: "Accessibilité : non conforme",
};

/** @param {DeclarationA11yReport} report */
const summary = (report) => {
  if (report) {
    const { mention, declarationUrl } = report;
    const mentionIndex = mention ? Object.values(grades).indexOf(mention) : -1;

    let grade = undefined;
    if (mention !== undefined && mention !== null && mentionIndex > -1) {
      if (declarationUrl) {
        grade = Object.keys(grades)[mentionIndex];
      } else if (mention === "Accessibilité : non conforme") {
        grade = "D";
      } else {
        grade = "F";
      }
    }

    if (grade) {
      return {
        "declaration_a11yGrade": grade,
      };
    }
  }
};

module.exports = summary;
