import { ExpoConfig } from "@expo/config";

// Utilities
import { version } from "./package.json";

const primaryColor = "#2196f3";

/**
 * Semantic version name (viewable)
 *
 * Android - 'versionName'
 * iOS     - 'CFBundleShortVersionString'
 */
const versionName = version;
/**
 * Android build code (increment with each submitted build)
 */
const androidVersionCode = 4;
/**
 * iOS semantic build code (increment with each submitted build)
 *
 * NOTE: Can include additional integers to indicate release candidates
 *         until the version is released (remove 'rc#' suffix).
 */
const iosBuildNumber = `${version}rc2`;

export default (): ExpoConfig => ({
  // Information
  name: "PayMe",
  slug: "payme",
  version: versionName,
  orientation: "portrait",
  platforms: ["android", "ios"],
  entryPoint: "index.js",

  jsEngine: "hermes",

  // Theme
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: primaryColor,
  },

  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],

  // Android overrides
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/android_launcher.png",
      backgroundColor: primaryColor,
    },
    package: "ca.kendallroth.payme",
    permissions: [],
    versionCode: androidVersionCode,
  },
  androidNavigationBar: {
    barStyle: "dark-content",
  },

  // iOS overrides
  ios: {
    buildNumber: iosBuildNumber,
    bundleIdentifier: "ca.kendallroth.payme",
    // Icon must be 1024x1024 (no transparency)
    icon: "./assets/icon.png",
    supportsTablet: false,
  },
});
