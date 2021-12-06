import { DarkTheme, DefaultTheme as LightTheme } from "react-native-paper";

/*
 * Backdrop   - Backdrops of modals
 * Background - Appears behind scrollable content (pages, lists)
 * Surface    - Surfaces of components (cards, sheets, menus)
 */

// Extend 'react-native-paper' ThemeColors type
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      black: string;
      grey: {
        dark: string;
        base: string;
        light: string;
        lightest: string;
      };
      transparent: string;
      warning: string;
      white: string;
    }

    /*interface Theme {
      myOwnProperty: boolean;
    }*/
  }
}

const colorPrimary = "#219ebc";

/** Shared theme colors (typically literals) */
const sharedColors = {
  black: "#000000",
  // TODO: Figure out how to handle grey colors per theme!
  grey: {
    dark: "#666666",
    base: "#999999",
    light: "#cdcdcd",
    lightest: "#dedede",
  },
  warning: "#ffa23a",
  transparent: "transparent",
  white: "#ffffff",
};

/** Light theme colors */
const lightColors = {
  ...LightTheme.colors,
  ...sharedColors,
  primary: colorPrimary,
  background: "#efefef",
};

/** Dark theme colors */
const darkColors = {
  ...DarkTheme.colors,
  ...sharedColors,
  primary: colorPrimary,
};

const darkTheme = {
  ...DarkTheme,
  colors: darkColors,
};

const lightTheme = {
  ...LightTheme,
  colors: lightColors,
};

export { darkColors, darkTheme, lightColors, lightTheme, sharedColors };
