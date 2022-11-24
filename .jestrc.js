export default {
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageReporters: ["text"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
