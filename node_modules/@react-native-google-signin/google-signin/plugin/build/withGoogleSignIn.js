"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("expo/config-plugins");
const pkg = require('@react-native-google-signin/google-signin/package.json');
/**
 * Apply google-signin configuration for Expo SDK 47+ projects.
 */
const withGoogleSignIn = (config) => {
    return (0, config_plugins_1.withPlugins)(config, [
        // Android
        config_plugins_1.AndroidConfig.GoogleServices.withClassPath,
        config_plugins_1.AndroidConfig.GoogleServices.withApplyPlugin,
        config_plugins_1.AndroidConfig.GoogleServices.withGoogleServicesFile,
        // iOS
        config_plugins_1.IOSConfig.Google.withGoogle,
        config_plugins_1.IOSConfig.Google.withGoogleServicesFile,
    ]);
};
exports.default = (0, config_plugins_1.createRunOncePlugin)(withGoogleSignIn, pkg.name, pkg.version);
