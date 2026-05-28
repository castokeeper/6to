const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Inyectar polyfills ANTES de cualquier módulo (nivel Metro, no imports)
const originalGetPolyfills = config.serializer.getPolyfills || (() => []);
config.serializer.getPolyfills = function (options) {
  return [
    path.resolve(__dirname, 'polyfills.js'),
    ...originalGetPolyfills(options),
  ];
};

module.exports = config;
