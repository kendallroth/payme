import { ExpoConfig } from "@expo/config";

// Utilities
import { version } from "./package.json";

const primaryColor = "#219ebc";

export default (): ExpoConfig => ({
  // Information
  name: "PayMe",
  slug: "payme",
  version, // Android 'versionName', iOS 'CFBundleShortVersionString'
  orientation: "portrait",
  platforms: ["android", "ios"],
  entryPoint: "./src/App.tsx",

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
      foregroundImage: "./assets/icon-clear.png",
      backgroundColor: "#2196f3",
    },
  },
  androidNavigationBar: {
    barStyle: "dark-content",
  },

  // iOS overrides
  ios: {
    // Icon must be 1024x1024 (no transparency)
    icon: "./assets/icon.png",
    supportsTablet: false,
  },
});
