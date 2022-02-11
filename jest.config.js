module.exports = async () => ({
  bail: 1,
  coverageDirectory: './src',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js'],
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{js, jsx}'],
  verbose: true
});
