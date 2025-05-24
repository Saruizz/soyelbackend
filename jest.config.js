/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Directorio donde se encuentran los archivos de prueba
  testDirectory: 'src/__tests__',

  // Extensión de los archivos de prueba
  testMatch: ['**/__tests__/**/*.test.ts'],

  // Configuración para TypeScript
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Directorios que Jest debe ignorar
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],

  // Configuración de cobertura de código
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/types/**',
    '!src/**/interfaces/**',
  ],

  // Configuración de transformación de archivos
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },

  // Configuración de módulos
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // Configuración de variables de entorno para pruebas
  setupFiles: ['<rootDir>/src/__tests__/setup.ts'],

  // Configuración de timeouts
  testTimeout: 10000,

  // Configuración de verbosidad
  verbose: true,

  // Configuración de reporteros
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'coverage/junit',
      outputName: 'junit.xml',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}',
      ancestorSeparator: ' › ',
      addFileAttribute: true
    }]
  ],

  // Configuración de mocks
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  // Configuración de globals
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },

  // Configuración de coverage
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}; 