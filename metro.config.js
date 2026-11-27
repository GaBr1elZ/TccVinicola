// Mantém a pasta backend/ (API em Node) fora do bundle do app
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
const backendDir = path.resolve(__dirname, 'backend').replace(/[/\\]/g, '[/\\\\]');
config.resolver.blockList = [new RegExp(`^${backendDir}[/\\\\].*$`)];

module.exports = config;
