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
    /*adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },*/
  },
  androidNavigationBar: {
    barStyle: "dark-content",
    // backgroundColor: "#8ecae6",
  },

  // iOS overrides
  ios: {
    supportsTablet: false,
  },
});
