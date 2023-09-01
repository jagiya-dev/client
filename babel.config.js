module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@": "./src",
          "#": "./assets",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
