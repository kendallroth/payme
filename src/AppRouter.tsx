import React, { ReactElement } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

// Components
import MainTabRouter from "./TabRouter";
import { SettingsRouter } from "@screens/Settings";

// Utilities
import { colors } from "@styles/theme";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    text: colors.primary,
  },
};

const AppRouter = (): ReactElement => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={MainTabRouter} name="MainRouter" />
        <Stack.Screen component={SettingsRouter} name="SettingsRouter" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});

export default AppRouter;
