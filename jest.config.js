module.exports = async () => ({
  bail: 1,
  clearMocks: true,
  coverageDirectory: './src',
  forceExit: true,
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js'],
  resetMocks: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.{js, jsx}'],
  verbose: true
});
