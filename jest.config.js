const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

module.exports = {
  testEnvironment: "jsdom",

  transform: {
    ...tsJestTransformCfg,
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  testMatch: ["<rootDir>/src/tests/**/*.(test|spec).(ts|tsx)"],

  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/index.tsx", "!src/reportWebVitals.ts"],
};