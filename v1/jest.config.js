/* eslint @typescript-eslint/no-var-requires: "off" */
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  preset: 'ts-jest',
  testRegex: '(/tests/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  testEnvironment: 'jest-fixed-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],

  moduleNameMapper: {
    '\\.svg': 'svgr/webpack',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@ui/(.*)$': '<rootDir>/src/ui/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@models/(.*)$': '<rootDir>/src/core/db/models/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@types$': '<rootDir>/src/types',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/tests/ui/UploadForm.test.tsx'],
  transformIgnorePatterns: ['node_modules/.pnpm/.*', 'node_modules/(?!(msw|@mswjs|until-async)/)'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
