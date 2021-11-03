import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// Components
import MainTabRouter from "@screens/Main/MainTabRouter";
import { AboutScreen } from "@screens/Main/Settings";

// Utilities
import { colors } from "@styles/theme";

const Stack = createStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    text: colors.primary,
  },
};

const AppRouter = (): React.ReactElement => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="MainStack"
        screenOptions={{
          // NOTE: Default transition can cause flickering if header color is different than page!
          ...TransitionPresets.DefaultTransition,
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen component={MainTabRouter} name="MainStack" />
        <Stack.Screen component={AboutScreen} name="About" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
