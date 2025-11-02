module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Especificar el entorno instalado
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};