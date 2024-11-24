// jest.config.js
module.exports = {
    preset: 'ts-jest',          // This tells Jest to use ts-jest to transform TypeScript files
    testEnvironment: 'node',    // Use the Node environment for testing
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transpile TypeScript files
    },
    moduleFileExtensions: ['js', 'ts', 'tsx'], // Include TypeScript extensions
    transformIgnorePatterns: [
      'node_modules/(?!mongoose|other-package-to-transform)' // Specify to transform certain node_modules if needed
    ],
    testMatch: ['**/tests/**/*.test.ts'], // Match all .test.ts files
  };
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
      'ts-jest': {
        useESModules: true,  // Ensures that ts-jest works with ES modules
      },
    },
  };