module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/__mocks__/setup.js'],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  moduleNameMapper: {
    '.+\\.(png)$': 'jest-transform-stub',
    '\\.(svg)$': '<rootDir>/__mocks__/svgMock.js',
  },
  transformIgnorePatterns: [],
};
