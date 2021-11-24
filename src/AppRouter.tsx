import React, { ReactElement } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";

// Components
import MainTabRouter from "./TabRouter";
import { SettingsRouter } from "@screens/Settings";

export type RootRouterParams = {
  MainRouter: undefined;
  SettingsRouter: undefined;
};

export type RootRouterNavigation = NativeStackNavigationProp<RootRouterParams>;

const Stack = createNativeStackNavigator<RootRouterParams>();

const AppRouter = (): ReactElement => {
  const { colors } = useTheme();

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      text: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="MainRouter"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen component={MainTabRouter} name="MainRouter" />
        <Stack.Screen component={SettingsRouter} name="SettingsRouter" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
