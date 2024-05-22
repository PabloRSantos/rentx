/* eslint-disable import/no-extraneous-dependencies */
import { pathsToModuleNameMapper } from "ts-jest";

export default {
    bail: true,
    clearMocks: true,
    coverageProvider: "v8",
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/modules/**/useCases/**/*.ts"],
    coverageDirectory: "coverage",
    coverageReporters: ["lcov", "text-summary"],
    preset: "ts-jest",
    testMatch: ["**/*.spec.ts"],
    testTimeout: 10000,
    moduleNameMapper: pathsToModuleNameMapper(
        {
            "@/*": ["*"],
        },
        {
            prefix: "<rootDir>/src/",
        }
    ),
};
