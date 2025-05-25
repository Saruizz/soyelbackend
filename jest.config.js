/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Configuración básica
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testTimeout: 10000,

  // Ubicación de los tests
  testMatch: ['**/__tests__/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],

  // Transformación de TypeScript
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        isolatedModules: true // Mover aquí en lugar de globals
      }
    ]
  },

  // Configuración de módulos
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  // Configuración de setup
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],

  // Cobertura
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/types/**',
    '!src/**/interfaces/**'
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  // Reporters
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage/junit',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        addFileAttribute: true
      }
    ]
  ]
};