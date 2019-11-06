module.exports = {
  verbose: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|pdf)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  globals: {
    localStorage: {},
    NODE_ENV: 'test',
  },
  testPathIgnorePatterns: ['/node_modules/', '.history/'],
  // setupFiles: ['raf/polyfill'],
}
