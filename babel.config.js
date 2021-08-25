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
            "@config": "./src/utilities/config.ts",
            "@hooks": "./src/hooks",
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
    ],
    env: {
      production: {
        // Remove console statements from app during release builds
        // plugins: ["react-native-paper/babel", "transform-remove-console"],
        plugins: ["transform-remove-console"],
      },
    },
  };
};
