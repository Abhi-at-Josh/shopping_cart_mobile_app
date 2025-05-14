module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|react-clone-referenced-element' +
      '|@react-native-async-storage' +
      '|@react-native|react-native|@react-native-async-storage' +
      ')/)'
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testEnvironment: 'jsdom',
};
