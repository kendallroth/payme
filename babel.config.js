module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@components": "./src/components",
            "@contexts": "./src/contexts",
            "@config": "./src/utilities/config.ts",
            "@hooks": "./src/hooks",
            "@localization": "./src/localization",
            "@services": "./src/services",
            "@store": "./src/store",
            "@screens": "./src/screens",
            "@styles": "./src/styles",
            "@theme": "./src/styles/theme.ts",
            "@typings": "./src/typings",
            "@utilities": "./src/utilities",
          },
        },
      ],
      // Reanimated pulgin must be last item in plugins!
      "react-native-reanimated/plugin",
    ],
    env: {
      production: {
        // Remove console statements from app during release builds
        plugins: ["react-native-paper/babel", "transform-remove-console"],
      },
    },
  };
};
