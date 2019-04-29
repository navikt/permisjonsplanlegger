module.exports = {
  preset: 'js-with-babel',
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(css|jpg|png|svg|less)$': '<rootDir>/node_modules/jest-css-modules',
  },
  rootDir: './src'
};
