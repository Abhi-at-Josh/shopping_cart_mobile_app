const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

//This file is use to configure the metro bundler for react native
//It is use to fasrten the bundling process
//This file is use to fast reload the app as the file chage occurs in the project