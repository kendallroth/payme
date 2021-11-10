import { DefaultTheme } from "react-native-paper";

const colorPrimary = "#219ebc";

const colors = {
  ...DefaultTheme.colors,
  primary: colorPrimary,
  background: "#efefef",
  // Color literals
  transparent: "transparent",
  grey: {
    base: "#999999",
    light: "#cdcdcd",
    lightest: "#dedede",
  },
  white: "#ffffff",
  black: "#000000",
};

const theme = {
  ...DefaultTheme,
  colors,
};

export { colors };
export default theme;
