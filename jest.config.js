module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: ["src/utilities/*.ts"],
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/*.test.ts"],
};
